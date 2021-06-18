import { useState, useEffect } from "react"

function useField() {
  const [value, setValue] = useState('')
  const [error, setError] = useState()

  return [value, setValue, error, setError]
}

export { useField }