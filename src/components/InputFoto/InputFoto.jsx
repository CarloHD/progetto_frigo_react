/**
 *
 *
 *       const data = canvasRef.current.toDataURL('image/png')
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import * as cameraAPI from '../../API/camera_capture/camera_capture'
import * as tesseractAPI from '../../API/tesseract/tesseract'

import CSS from './InputFoto.module.css'
import { textOCR } from '../../API/OCRspace/OCRspace'

export function InputFoto ({ inputVisibile }) {
  const canvasRef = useRef()
  const canvasDataUrl = useRef(null)

  const videoRef = useRef()
  const streamVideo = useRef(null)

  const [errorMsg, setErrorMsg] = useState(null)

  const [modalitàScatto, setModalitàScatto] = useState(true)

  const avvioCamera = useCallback(async () => {
    try {
      streamVideo.current = await cameraAPI.getStreamVideo()

      videoRef.current.srcObject = streamVideo.current
      videoRef.current.play()
    } catch (error) {
      setErrorMsg(error.message)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamVideo.current) {
      cameraAPI.stopStreamVideo(streamVideo.current)
    }
  }, [streamVideo])

  useEffect(() => {
    if (modalitàScatto) {
      avvioCamera()
    }

    return () => {
      stopCamera()
    }
  }, [avvioCamera, stopCamera, modalitàScatto])

  const clickScatto = () => {
    if (modalitàScatto) {
      if (streamVideo.current) {
        const risoluzioneScatto = cameraAPI.getStreamResolution(
          streamVideo.current
        )

        canvasRef.current.width = risoluzioneScatto.width
        canvasRef.current.height = risoluzioneScatto.height

        const canvasCtx = canvasRef.current.getContext('2d')
        canvasCtx.filter = 'saturate(0%) brightness(200%)'
        canvasCtx.drawImage(
          videoRef.current,
          0,
          0,
          risoluzioneScatto.width,
          risoluzioneScatto.height
        )

        canvasDataUrl.current = canvasRef.current.toDataURL('image/png')

        stopCamera()
        setModalitàScatto(false)
      }
    } else {
      setModalitàScatto(true)
    }
  }

  const clickConferma = () => {
    // tesseractAPI.getTextOCR(canvasDataUrl.current)
    textOCR(canvasDataUrl.current)
  }

  return (
    <div className='col-xs-12'>
      <div className='row' style={{ position: 'relative' }}>
        <canvas
          className={`${CSS.placeholder} center-block ${
            modalitàScatto && CSS.nonMontato
          }`}
          ref={canvasRef}
        />

        <video
          className={`${CSS.placeholder} center-block ${
            !modalitàScatto && CSS.nonMontato
          }`}
          ref={videoRef}
          width={320}
          height={240}
        />

        <div
          className='col-xs-12 text-center'
          style={{ position: 'absolute', bottom: '2rem' }}
        >
          <div className='btn-group'>
            <button
              className={'btn btn-primary'}
              disabled={errorMsg}
              onClick={clickScatto}
            >
              {!modalitàScatto ? (
                <span className='glyphicon glyphicon-repeat' />
              ) : (
                <span className='glyphicon glyphicon-record' />
              )}
            </button>
            {!modalitàScatto && (
              <button className={'btn btn-success'} onClick={clickConferma}>
                <span className='glyphicon glyphicon-ok' />
              </button>
            )}
          </div>
        </div>
      </div>
      {errorMsg && (
        <div className='row'>
          <br />
          <div className='alert alert-danger' role='alert'>
            <p>{errorMsg}</p>
            <br />
            <small>Controlla il log per eventuali ulteriori dettagli</small>
          </div>
        </div>
      )}
    </div>
  )
}
