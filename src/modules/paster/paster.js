// @flow
import React from 'react'

let listener

// naive type
type Blob = mixed
type ClipboardData = { items: { getAsFile: () => Blob } }
type PasteEvent = { clipboardData: ClipboardData }

type PngBase64 = string

async function retrieveImageFromClipboardAsBase64(
  pasteEvent: PasteEvent,
  callback: (PngBase64) => void,
  imageFormat?: string,
) {
  const { clipboardData } = pasteEvent
  if (clipboardData == null) return
  const { items = [] } = clipboardData
  // $FlowIssue
  Array.from(items).forEach((item) => {
    if (item.type.indexOf('image') > -1) {
      const blob = item.getAsFile()

      // Create an abstract canvas and get context
      const canvas = document.createElement('canvas') // eslint-disable-line no-undef
      const ctx = canvas.getContext('2d')

      // Create an image
      const img = new Image() // eslint-disable-line no-undef

      // Once the image loads, render the img on the canvas
      img.onload = function() {
        // Update dimensions of the canvas with the dimensions of the image
        canvas.width = this.width
        canvas.height = this.height

        // Draw the image
        ctx.drawImage(img, 0, 0)

        // Execute callback with the base64 URI of the image
        if (typeof callback === 'function') {
          callback(
            canvas.toDataURL(imageFormat || 'image/png'),
            img.width,
            img.height,
          )
        }
      }
      const URLObj = window.URL || window.webkitURL

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URLObj.createObjectURL(blob)
    }
  })

  // Crossbrowser support for URL
}

function listenPaste(callback) {
  // no more than one listener
  if (listener) return

  listener = window.addEventListener(
    // eslint-disable-line no-undef
    'paste',
    async (e) => {
      // Handle the event
      retrieveImageFromClipboardAsBase64(
        e,
        (imageDataBase64, width, height) => {
          // If there's an image, open it in the browser as a new window :)
          if (imageDataBase64) {
            // data:image/png;base64,iVBORw0KGgoAAAAN......
            callback(imageDataBase64, { width, height })
          }
        },
      )
    },
    false,
  )

  async function createImage(blob: Blob) {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const image = await new Promise((resolve) => {})
    img.onLoad = function() {
      canvas.width = img.width
      canvas.height = img.height

      // Draw the image
      ctx.drawImage(img, 0, 0)

      // Execute callback with the base64 URI of the image
      if (typeof callback === 'function') {
        callback(canvas.toDataURL('image/png'), img.width, img.height)
      }
    }
  }

  /**
   * This handler retrieves the images from the clipboard as a base64 string and returns it in a callback.
   *
   * @param pasteEvent
   * @param callback
   */
}

export default function paster(Component) {
  return class PasterWrapper extends React.Component {
    componentDidMount() {
      if (this.props.onImagePaste) {
        listenPaste(this.props.onImagePaste)
      }
    }

    componentWillMount() {
      if (this.props.onImagePaste) {
        // TODO unlistenPast(this.props.onImagePaste)
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
