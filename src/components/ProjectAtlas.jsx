import { useEffect, useMemo, useRef, useState } from 'react'

function getNodeLayout(count, compact) {
  if (count === 0) return []

  const radius = compact ? 25 : count <= 4 ? 31 : 34
  const center = { left: 50, top: 50 }

  return Array.from({ length: count }, (_, index) => {
    if (count === 1) return center

    const angle = -Math.PI / 2 + (index * (Math.PI * 2)) / count
    const ring = count > 6 && index % 2 === 1 ? radius - 8 : radius

    return {
      left: center.left + Math.cos(angle) * ring,
      top: center.top + Math.sin(angle) * ring,
    }
  })
}

function getRouteStyle(start, end) {
  const deltaX = end.left - start.left
  const deltaY = end.top - start.top
  const length = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

  return {
    left: `${start.left}%`,
    top: `${start.top}%`,
    width: `${length}%`,
    transform: `rotate(${angle}deg)`,
  }
}

function drawTerrain(canvas, width, height) {
  const context = canvas.getContext('2d')
  if (!context) return

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  context.clearRect(0, 0, width, height)

  const blueGlow = context.createRadialGradient(width * 0.25, height * 0.3, 0, width * 0.25, height * 0.3, width * 0.42)
  blueGlow.addColorStop(0, 'rgba(97, 156, 255, 0.12)')
  blueGlow.addColorStop(1, 'rgba(97, 156, 255, 0)')
  context.fillStyle = blueGlow
  context.fillRect(0, 0, width, height)

  const violetGlow = context.createRadialGradient(width * 0.78, height * 0.7, 0, width * 0.78, height * 0.7, width * 0.38)
  violetGlow.addColorStop(0, 'rgba(167, 139, 250, 0.1)')
  violetGlow.addColorStop(1, 'rgba(167, 139, 250, 0)')
  context.fillStyle = violetGlow
  context.fillRect(0, 0, width, height)

  context.strokeStyle = 'rgba(97, 156, 255, 0.1)'
  context.lineWidth = 1
  for (let x = 28; x < width; x += 56) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }
  for (let y = 28; y < height; y += 56) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }

  context.strokeStyle = 'rgba(167, 139, 250, 0.24)'
  context.lineWidth = 1
  for (let line = 0; line < 7; line += 1) {
    const baseY = height * (0.12 + line * 0.13)
    context.beginPath()
    for (let x = -20; x <= width + 20; x += 10) {
      const wave = Math.sin((x / width) * Math.PI * 2.2 + line * 0.8) * (height * 0.025)
      const secondaryWave = Math.sin((x / width) * Math.PI * 5 + line) * (height * 0.009)
      const y = baseY + wave + secondaryWave
      if (x === -20) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.stroke()
  }
}

function ProjectAtlas({ projects, selectedIndex, onSelect }) {
  const mapRef = useRef(null)
  const canvasRef = useRef(null)
  const [compact, setCompact] = useState(false)
  const positions = useMemo(() => getNodeLayout(projects.length, compact), [projects.length, compact])
  const routes = useMemo(
    () => positions.slice(1).map((position, index) => getRouteStyle(positions[index], position)),
    [positions],
  )

  useEffect(() => {
    if (!mapRef.current || !canvasRef.current) return undefined

    const renderMap = () => {
      const bounds = mapRef.current.getBoundingClientRect()
      const nextCompact = bounds.width < 440
      setCompact((currentCompact) => currentCompact === nextCompact ? currentCompact : nextCompact)
      drawTerrain(canvasRef.current, bounds.width, bounds.height)
    }

    renderMap()
    const observer = new ResizeObserver(renderMap)
    observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="atlas-shell">
      <div ref={mapRef} className="atlas-map" aria-label="Interactive project atlas">
        <canvas ref={canvasRef} className="atlas-terrain" aria-hidden="true" />
        <div className="atlas-map-header">
          <span>PROJECT ATLAS</span>
          <span>SELECT A PROJECT</span>
        </div>

        <div className="atlas-routes" aria-hidden="true">
          {routes.map((route, index) => (
            <span key={`route-${index}`} className="atlas-route" style={route} />
          ))}
        </div>

        {projects.map((project, index) => {
          const position = positions[index]
          return (
            <button
              key={project.id}
              type="button"
              className={`atlas-node${selectedIndex === index ? ' is-selected' : ''}`}
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect(index)
                }
              }}
              aria-pressed={selectedIndex === index}
              aria-label={`Select ${project.title} project`}
            >
              <span className="node-marker" aria-hidden="true" />
              <span className="node-label">{project.title}</span>
            </button>
          )
        })}
      </div>

      <div className="atlas-mobile-list" aria-label="Project atlas list">
        {projects.map((project, index) => (
          <button
            key={`mobile-${project.id}`}
            type="button"
            className={`atlas-list-item${selectedIndex === index ? ' is-selected' : ''}`}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(index)
              }
            }}
            aria-pressed={selectedIndex === index}
          >
            <strong>{project.title}</strong>
            <span>{project.year}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectAtlas
