import { useNavigate } from "react-router-dom";
import './style.scss';

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="app-header" onClick={() => navigate('/')
    }>
      <h2 className="app-title">Podcaster</h2>
    </header>
  )
}
