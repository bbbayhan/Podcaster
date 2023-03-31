import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="App-header" onClick={() => navigate('/', { replace: true })
    }>
      <h2 className="App-title">Podcaster</h2>
    </header>
  )
}
