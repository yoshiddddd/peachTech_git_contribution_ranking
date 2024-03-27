import LinearProgress from '@mui/joy/LinearProgress';

export const Loading =()=>{
    return(
        <div className='LoadMain'>
        <div className='progressBarContainer'>
          <h2>Now Loading・・・</h2>
          <LinearProgress size="lg"/>
        </div>
      </div>
    )
}