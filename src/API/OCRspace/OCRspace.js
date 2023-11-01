const apiKey = 'K87168937488957'

const headers = new Headers()
headers.append('apikey', apiKey)

const formdata = new FormData()
formdata.append('language', 'ita')
formdata.append('isOverlayRequired', 'false')
formdata.append('iscreatesearchablepdf', 'false')
formdata.append('issearchablepdfhidetextlayer', 'false')
formdata.append('OCREngine', '2')

export const textOCR = async imgUrl => {
  formdata.append('base64Image', imgUrl)

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow'
  }

  const res = await fetch('https://api.ocr.space/parse/image', requestOptions)

  const data = await res.json()

  console.log(data)

  // try {
  //   const res = await fetch('https://api.ocr.space/parse/image', requestOptions)

  //   const data = await res.json()

  //   if (data.ErrorMessage) {
  //     throw data
  //   }

  //   // console.log(data.ParsedResults[0].ParsedText)
  // } catch (error) {
  //   if (error.ErrorMessage) {
  //     throw new Error()
  //   }

  //   throw new Error(
  //     'Errore imprevisto, controlla la connessione di rete e riprova'
  //   )
  // }
}
