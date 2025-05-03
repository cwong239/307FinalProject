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
    
    #print("adjust_gamma called.")
    
    # If gamma is 1, return an unchanged copy of the image for efficiency.
    if np.isclose(gamma, 1.0):
        return image.copy()

    #print("adjust_gamma: computing effective exponent.")

    # Otherwise, compute the effective exponent for gamma correction.
    effective_exponent = 1.0 / gamma

    # Create a lookup table mapping each pixel value [0, 255] to its adjusted gamma value.
    table = np.array([((i / 255.0) ** effective_exponent) * 255 for i in np.arange(256)]).astype("uint8")
    return cv2.LUT(image, table)

def process_image(image, brightness, contrast, gamma):
    """
    Process the image by adjusting brightness and contrast.

    Parameters:
      image (np.ndarray): The input image.
      brightness (float): Value to add to each pixel (brightness adjustment).
      contrast (float): Factor to multiply each pixel by (contrast adjustment).

    Returns:
      bytes: The JPEG-encoded processed image.

    Raises:
      Exception: If the encoding fails.
    """

    #print("process_image() called.")

    # Apply brightness and contrast adjustments
    processed_image = cv2.convertScaleAbs(image, alpha=contrast, beta=brightness)
    
    #print("process_image: about to call adjust_gamma.")
    
    #if gamma != 1.0:
    processed_image = adjust_gamma(processed_image, gamma)
    
    #print("process_image: called adjust_gamma.")
    
    # Encode the processed image as JPEG
    success, encoded_image = cv2.imencode('.jpg', processed_image)
    if not success:
        #print("process_image: failed to encode the processed image.")
        raise Exception("Failed to encode the processed image.")
    
    #print("process_image: returning encoded image.")
    return encoded_image.tobytes()
