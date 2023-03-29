import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="App-header" onClick={() => navigate('/', { replace: true })
    }>
      <h3 className="App-title">Podcaster</h3>
    </header>
  )
}
