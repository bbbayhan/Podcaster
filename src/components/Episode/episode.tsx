import {useLocation} from 'react-router-dom'
export const Episode = (): JSX.Element => {
  const parser = new DOMParser();
  const {state} = useLocation();
  const doc = parser.parseFromString(state.description, 'text/html');

    return (
      <article className="episode">
      <main>
        <h2>{state.title}</h2><p>{state.description}</p><audio src={state.audio} controls data-testid="audio-element"></audio></main>
    </article>
    )
  }