import cv2
import numpy as np

from ultralytics import YOLO

def adjust_gamma(image, gamma=1.0):
    """
    Adjust the gamma of the image using the power-law transform.
    
    With the transformation:
        output = 255 * (input/255)^(1/gamma)
    
    This means:
      - gamma < 1 darkens the image,
      - gamma = 1 leaves the image unchanged,
      - gamma > 1 brightens the image.
    """
    
    # If gamma is 1, return an unchanged copy of the image for efficiency.
    if np.isclose(gamma, 1.0):
        return image.copy()

    # Otherwise, compute the effective exponent for gamma correction.
    effective_exponent = 1.0 / gamma

    # Create a lookup table mapping each pixel value [0, 255] to its adjusted gamma value.
    table = np.array([((i / 255.0) ** effective_exponent) * 255 for i in np.arange(256)]).astype("uint8")
    return cv2.LUT(image, table)

def remove_background(image: np.ndarray,
                      model_weights: str = "yolo11x-seg.pt",
                      mask_threshold: float = 0.5) -> np.ndarray:
    """
    Removes the background from an OpenCV image (mat) using a YOLOv11 segmentation model.
    Only the regions inside detected objects will be kept. The rest of the image
    (background) becomes transparent in the resulting BGRA image.

    Parameters:
      image         : Input image (OpenCV mat, BGR format) as a NumPy array.
      model_weights : Identifier or path for the YOLOv11 segmentation model weights.
      mask_threshold: Threshold to binarize each segmentation mask (default is 0.5).

    Returns:
      result_image  : The output image with an alpha channel (BGRA) where the background is transparent.
    """
    if image is None:
        print("remove_background: Input image is None.")
        raise ValueError("Input image is None.")
    
    # Initialize the YOLOv11 segmentation model.
    model = YOLO(model_weights, verbose=False)
    
    # Run the segmentation model on the image.
    results = model(image)
    if not results:
        print("remove_background: No results returned by the YOLO model.")
        raise RuntimeError("No results returned by the YOLO model.")

    # Process the first result (assuming one image was processed).
    result = results[0]
    height, width = image.shape[:2]
    final_mask = np.zeros((height, width), dtype=np.uint8)
    
    # Ensure segmentation masks are available in the result.
    if result.masks is not None and result.masks.data is not None:
        masks_data = result.masks.data
        # Convert the masks to a NumPy array if necessary.
        if hasattr(masks_data, "cpu"):
            masks_data = masks_data.cpu().numpy()
        else:
            masks_data = np.array(masks_data)

        # Combine all detected object masks into one final mask.
        for mask in masks_data:
            binary_mask = (mask > mask_threshold).astype(np.uint8)
            
            # If the segmentation mask shape doesn't match the image, resize it.
            if binary_mask.shape != (height, width):
                binary_mask = cv2.resize(binary_mask, (width, height), interpolation=cv2.INTER_NEAREST)
            
            try:
                final_mask = np.maximum(final_mask, binary_mask)
            except Exception as e:
                print("Error encountered when applying np.maximum:")
                print("final_mask shape:", final_mask.shape, "dtype:", final_mask.dtype)
                print("binary_mask shape:", binary_mask.shape, "dtype:", binary_mask.dtype)
                print("Exception:", e)

    else:
        print("remove_background: No segmentation masks detected for this image.")
        raise RuntimeError("No segmentation masks detected for this image.")

    # Convert the binary mask to the proper 0-255 range for an alpha channel.
    final_mask = (final_mask * 255).astype(np.uint8)

    # Create a BGRA image by splitting the input image and adding the alpha channel.
    b, g, r = cv2.split(image)
    alpha = final_mask
    result_image = cv2.merge([b, g, r, alpha])
    
    return result_image
    
def adjust_opacity(image, opacity: float = 1.0):
    """
    Adjust the opacity of an image.

    Parameters:
        image (numpy.ndarray): The input image in BGR or BGRA format.
        opacity (float): A factor between 0.0 and 1.0 where 0.0 means fully transparent
                              and 1.0 means fully opaque.

    Returns:
        numpy.ndarray: A new image with adjusted opacity in BGRA format.
    """
    
    # Clamp the opacity factor to the range [0.0, 1.0]
    opacity = max(0.0, min(1.0, opacity))
    
    # If the image is grayscale, convert it to BGRA.
    # (This step is optional and depends on your specific use case.)
    if len(image.shape) == 2:
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGRA)

    # Determine the number of channels in the image
    num_channels = image.shape[2]
    
    if num_channels == 4:
        # If the image already has an alpha channel, adjust it by multiplying with the factor.
        output = image.copy()
        # Multiply the alpha channel (at index 3) with the opacity factor.
        output[:, :, 3] = (output[:, :, 3].astype(np.float32) * opacity).astype(np.uint8)
    elif num_channels == 3:
        # Convert a BGR image to BGRA.
        output = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
        # Set the alpha channel to 255 * opacity.
        alpha_value = np.uint8(255 * opacity)
        output[:, :, 3] = alpha_value
    else:
        raise ValueError(f"Unsupported number of channels: {num_channels}. Expected 3 or 4.")

    return output



def process_image(image, brightness, contrast, gamma, opacity, remove_bg):
    """
    Process the image by adjusting brightness and contrast.

    Parameters:
      image (np.ndarray): The input image.
      brightness (float): Value to add to each pixel (brightness adjustment).
      contrast (float): Factor to multiply each pixel by (contrast adjustment).

    Returns:
      bytes: The PNG-encoded processed image.

    Raises:
      Exception: If the encoding fails.
    """
    
    # Apply brightness and contrast adjustments
    processed_image = cv2.convertScaleAbs(image, alpha=contrast, beta=brightness)
    
    processed_image = adjust_gamma(processed_image, gamma)
    
    if remove_bg:
        processed_image = remove_background(processed_image)
    
    try:
	    processed_image = adjust_opacity(processed_image, opacity)
    except Exception as e:
        print(f"Exception occurred: {e}")
    
    # Encode the processed image as png.
    success, encoded_image = cv2.imencode(".png", processed_image)
    if not success:
        print("process_image: failed to encode the processed image.")
        raise Exception("Failed to encode the processed image.")
    
    return encoded_image.tobytes()
