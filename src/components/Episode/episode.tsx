import {useLocation} from 'react-router-dom'
import './style.scss';
export const Episode = (): JSX.Element => {
  const {state} = useLocation();

    return (
      <div className="episode">
      <article className="episode-article">
      <main className="episode-content">
        <h2 className="episode-title">{state.title}</h2><p className="episode-description" dangerouslySetInnerHTML={{ __html: state.description }}></p><audio className="episode-audio" src={state.audio} controls data-testid="audio-element"></audio></main>
    </article></div>
    )
  }