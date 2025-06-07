import cv2
import numpy as np

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

def convert_to_grayscale(image: np.ndarray) -> np.ndarray:
    """
    Convert an OpenCV image to grayscale while preserving transparency.
    The reason why this is necessary is because converting to "regular"
    grayscale removes transparency.
    """
    # If the image is empty or not a proper array, raise an error.
    if image is None or not hasattr(image, 'shape'):
        raise ValueError("A valid image must be provided.")

    # Handle images with an alpha channel (4 channels).
    if image.ndim == 3 and image.shape[2] == 4:
        # Split the BGRA channels.
        b, g, r, alpha = cv2.split(image)
        # Merge B, G, R to form a BGR image.
        bgr_image = cv2.merge([b, g, r])
        # Convert the BGR image to grayscale.
        gray = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)
        # Merge the grayscale image with the alpha channel.
        result_image = cv2.merge([gray, gray, gray, alpha])
        return result_image

    # Handle images with no alpha channel.
    elif image.ndim == 3 and image.shape[2] == 3:
        # Convert BGR image to grayscale.
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return gray

    # If the image is already single channel, assume it is grayscale.
    elif image.ndim == 2:
        # Already grayscale; no conversion needed.
        return image

    else:
        raise ValueError("Unsupported image format: image should be BGR, BGRA, or grayscale.")


def process_image(image, brightness, contrast, grayscale,
                    gamma, opacity, remove_bg):
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

    # Apply gamma adjustments.
    processed_image = adjust_gamma(processed_image, gamma)

    # Remove background if necessary.
    if remove_bg and 0: # never run
        processed_image = remove_background(processed_image)

    # Convert to grayscale if necessary.
    if grayscale:
        processed_image = convert_to_grayscale(processed_image)

    # Adjust opacity.
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
