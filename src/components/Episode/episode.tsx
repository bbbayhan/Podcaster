import {useLocation} from 'react-router-dom'
import './style.scss';
export const Episode = (): JSX.Element => {
  const {state} = useLocation();

    return (
      <div className="episode">
      <article>
      <main>
        <h2>{state.title}</h2><p dangerouslySetInnerHTML={{ __html: state.description }}></p><audio src={state.audio} controls data-testid="audio-element"></audio></main>
    </article></div>
    )
  }