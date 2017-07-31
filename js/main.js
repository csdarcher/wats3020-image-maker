/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor(){ // When this class is instantiated, the `constructor()` method is executed.
        

        this.imagePreview = document.getElementById('image-preview'); // this selects the `#image-preview` div 

        // Allow user to iput text onto top of image
        this.topText = document.createElement('p'); // creates a new `<p>` element 
        
        this.topText.setAttribute('class', 'top-text'); // creates a new 'class'
        
        this.imagePreview.appendChild(this.topText); // adds 'topText' to image

        
      // Allow user to iput text onto bottom of image
        this.bottomText = document.createElement('p'); // creates a new '<p>' element
        
        this.bottomText.setAttribute('class', 'bottom-text'); // creates a new 'class'
        
        this.imagePreview.appendChild(this.bottomText); // adds 'bottomText' to image
        
      
        // Enable the the class to use the form fields to read user input. 

        // Selects the `input` element with the `name` attribute "backgroundImage"
        this.backgroundInput = document.querySelector('select[name="backgroundImage"]'); 

        // Selects the `input` element with the `name` attribute "topText"
        this.topTextInput = document.querySelector('input[name="topText"]');

        // Select the `input` element with the `name` attribute "bottomText"
        this.bottomTextInput = document.querySelector('input[name="bottomText"]');

        // ** Future Developers of the Universe: If you add additional form fields to modify other aspects of
        // the image, then you will need to make attributes for each of those
        // elements here.**
    }
    drawPreview(){
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function must
        // update the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.

        this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value})`; // updates the background image to one user chose
        
        this.topText.innerHTML = this.topTextInput.value; // updates topText to what user wrote
       
        this.bottomText.innerHTML = this.bottomTextInput.value; // updates bottomText to what user wrote.

    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();
