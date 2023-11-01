import Tesseract from 'tesseract.js'

export const getTextOCR = async url => {
  try {
    const { data } = await Tesseract.recognize(url, 'ita', {
      logger: m => console.log(m)
    })

    console.log(data.text)
  } catch (error) {
    console.error(error)
  }
}
