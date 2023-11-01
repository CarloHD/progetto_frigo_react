import { useRef, useState } from 'react'

export function TestPage (params) {
  const videoRef = useRef()
  const [videoResolution, setVideoResolution] = useState({
    width: '0',
    height: '0'
  })
  const [videoStream, setVideoStream] = useState(null)

  const canvasRef = useRef()

  const videoTag = (
    <video
      className='center-block'
      style={{ border: 'solid 1px red' }}
      ref={videoRef}
      height={videoResolution.height}
      width={videoResolution.stream}
    >
      Video stream not available.
    </video>
  )

  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { exact: 'environment' },
        audio: false
      })

      const videoSetting = await stream.getVideoTracks()[0].getSettings()

      setVideoResolution({
        height: videoSetting.height,
        width: videoSetting.width
      })

      videoRef.current.srcObject = stream
      setVideoStream(stream)

      await videoRef.current.play()
    } catch (error) {
      videoRef.current.srcObject = null
      alert(error)
    }
  }

  const stopStream = () => {
    if (videoStream) {
      videoRef.current.srcObject = null
      videoStream.getVideoTracks()[0].stop()
      setVideoStream(null)
      setVideoResolution({ height: 0, width: 0 })
    }
  }

  const takeFoto = async () => {
    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, 320, 240)
    stopStream()
  }

  return (
    <div className='col-xs-12'>
      <canvas
        className='center-block'
        width='320'
        height='240'
        style={{ border: 'solid 1px blue' }}
        ref={canvasRef}
      ></canvas>
      <br />
      {videoTag}
      <br />
      <div className='btn-group btn-group-justified'>
        <div className='btn-group'>
          <button className='btn btn-primary' onClick={getStream}>
            Avvia
          </button>
        </div>
        <div className='btn-group'>
          <button className='btn btn-success' onClick={takeFoto}>
            acquisisci foto
          </button>
        </div>
        <div className='btn-group'>
          <button className='btn btn-danger' onClick={stopStream}>
            stop
          </button>
        </div>
      </div>
    </div>
  )
}
