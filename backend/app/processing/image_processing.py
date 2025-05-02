import cv2

def process_image(image, brightness, contrast):
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
    
    # Encode the processed image as JPEG
    success, encoded_image = cv2.imencode('.jpg', processed_image)
    if not success:
        raise Exception("Failed to encode the processed image.")
    
    return encoded_image.tobytes()
