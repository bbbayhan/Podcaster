import {useLocation} from 'react-router-dom'
export const Episode = (): JSX.Element => {
  const {state} = useLocation();

    return (
      <div style={{marginLeft: '24rem', color: 'black'}}>
      <article className="episode">
      <main>
        <h2 style={{padding: '0.8rem'}}>{state.title}</h2><p dangerouslySetInnerHTML={{ __html: state.description }} style={{padding: '0.5rem'}}></p><audio style={{padding: '0.5rem'}} src={state.audio} controls data-testid="audio-element"></audio></main>
    </article></div>
    )
  }