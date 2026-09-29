import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { driver } from 'driver.js'
import { onboardingSteps } from '../config/onboardingSteps'

export function useOnboardingViewModel(userId: number) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const storageKey = `factus.guide.v1.${userId}`
  const [stepIndex, setStepIndex] = useState<number | null>(() => {
    try {
      return pathname === '/dashboard' && !localStorage.getItem(storageKey)
        ? 0
        : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (stepIndex === null) return
    const step = onboardingSteps[stepIndex]
    if (pathname !== step.path) {
      navigate(step.path)
      return
    }

    let disposing = false
    function finish() {
      try {
        localStorage.setItem(storageKey, 'seen')
      } catch {
        // The guide remains usable when browser storage is unavailable.
      }
      setStepIndex(null)
    }

    const tour = driver({
      animate: false,
      overlayColor: '#000',
      overlayOpacity: 0.75,
      stagePadding: 8,
      stageRadius: 12,
      disableActiveInteraction: true,
      allowKeyboardControl: false,
      popoverClass: 'factus-guide',
      onDestroyed: () => {
        if (!disposing) finish()
      },
    })

    tour.highlight({
      element: step.element,
      popover: {
        title: step.title,
        description: step.description,
        side: 'bottom',
        showButtons: ['previous', 'next', 'close'],
        disableButtons: stepIndex === 0 ? ['previous'] : [],
        prevBtnText: 'Anterior',
        nextBtnText: step.next,
        doneBtnText: step.next,
        showProgress: true,
        progressText: `Paso ${stepIndex + 1} de ${onboardingSteps.length}`,
        onNextClick: () => {
          if (stepIndex === onboardingSteps.length - 1) {
            finish()
            navigate('/products')
          } else {
            setStepIndex(stepIndex + 1)
          }
        },
        onPrevClick: () => setStepIndex(Math.max(0, stepIndex - 1)),
        onCloseClick: finish,
        onPopoverRender: (popover) => {
          popover.closeButton.setAttribute('aria-label', 'Cerrar guía')
        },
      },
    })

    return () => {
      disposing = true
      tour.destroy()
    }
  }, [stepIndex, pathname, navigate, storageKey])

  function start() {
    setStepIndex(0)
  }

  return { start, active: stepIndex !== null }
}
