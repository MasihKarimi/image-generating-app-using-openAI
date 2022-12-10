function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  // document.querySelector('#image').src = '';

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector('input[name="size"]').value;
  // Set the checked state of the selected radio button
  document.querySelector(
    'input[name="size"][value="' + size + '"]'
  ).checked = true;
  const n = document.querySelector("#n").value;
  const number = parseInt(n);
  //console.log({prompt,})
  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size, number);
}

async function generateImageRequest(prompt, size, number) {
  // Get the container element where the images will be added
  const container = document.getElementById("image-container");
  try {
    showSpinner();
    // Get all the img elements in the container
    const images = container.getElementsByTagName("img");

    // Loop through the img elements and set their display property to "none"
    for (const img of images) {
      img.style.display = "none";
    }

    const response = await fetch("/openai/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
        n: number,
      }),
    });
    document.querySelector(".msg").textContent = "Generated Images";
    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();

    // Get the array of image URLs from the response data
    const imageUrls = data.data;

    // Loop through the array of image URLs
    for (const url of imageUrls) {
      // Create an img element
        const img = document.createElement("img");
        img.className = 'uk-child-width-1-3@m  uk-inline border-radius-large border-xlight';

      // Set the src attribute of the img element to the URL of the image
      img.src = url;

      // Add the img element to the container
      container.appendChild(img);
    }

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
