import React from 'react'

let listener

function listenPaste(callback) {
  if (listener) return

  listener = window.addEventListener(
    'paste',
    function(e) {
      // Handle the event
      retrieveImageFromClipboardAsBase64(e, function(
        imageDataBase64,
        width,
        height,
      ) {
        // If there's an image, open it in the browser as a new window :)
        if (imageDataBase64) {
          // data:image/png;base64,iVBORw0KGgoAAAAN......
          callback(imageDataBase64, { width, height })
        }
      })
    },
    false,
  )

  /**
   * This handler retrieves the images from the clipboard as a base64 string and returns it in a callback.
   *
   * @param pasteEvent
   * @param callback
   */
  function retrieveImageFromClipboardAsBase64(
    pasteEvent,
    callback,
    imageFormat,
  ) {
    if (pasteEvent.clipboardData == false) {
      if (typeof callback == 'function') {
        callback(undefined)
      }
    }

    var items = pasteEvent.clipboardData.items

    if (items == undefined) {
      if (typeof callback == 'function') {
        callback(undefined)
      }
    }

    for (var i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf('image') == -1) continue
      // Retrieve image on clipboard as blob

      var blob = items[i].getAsFile()

      // Create an abstract canvas and get context
      var mycanvas = document.createElement('canvas')
      var ctx = mycanvas.getContext('2d')

      // Create an image
      var img = new Image()

      // Once the image loads, render the img on the canvas
      img.onload = function() {
        // Update dimensions of the canvas with the dimensions of the image
        mycanvas.width = this.width
        mycanvas.height = this.height

        // Draw the image
        ctx.drawImage(img, 0, 0)

        // Execute callback with the base64 URI of the image
        if (typeof callback == 'function') {
          callback(
            mycanvas.toDataURL(imageFormat || 'image/png'),
            img.width,
            img.height,
          )
        }
      }

      // Crossbrowser support for URL
      var URLObj = window.URL || window.webkitURL

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URLObj.createObjectURL(blob)
    }
  }
}

export default function paster(Component) {
  return class PasterWrapper extends React.Component {
    componentDidMount() {
      if (this.props.onImagePaste) {
        listenPaste(this.props.onImagePaste)
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
