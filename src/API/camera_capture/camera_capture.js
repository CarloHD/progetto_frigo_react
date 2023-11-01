export const getStreamVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    })

    return stream
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      console.error(error)

      throw new Error(
        "Non è stato possibile avviare la camera, controlla di aver consentito al browser l'accesso alla camera ed aggiorna la pagina"
      )
    }
  }
}

export const stopStreamVideo = stream => {
  stream.getVideoTracks().forEach(track => {
    track.stop()
  })
  stream.current = null
}

export const getStreamResolution = stream => {
  const streamSetting = stream.getVideoTracks()[0].getSettings()

  const resolution = {
    width: streamSetting.width / 2,
    height: streamSetting.height / 2
  }

  return resolution
}
