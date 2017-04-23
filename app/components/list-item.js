import React from 'react'

const ActionsComponent = (
    {actions, title, handleMouseOver, handleMouseOut, currentAction, hasNext, hasPrev}) => {
   
  return (
      <div id={title + "-actions"} className="actions">
        {hasPrev ? <span className="prev-actions">{'<'}</span> : undefined}
        <ul>
          {actions.map ((action, index, actions) =>
            <Action 
              name={action.name}
              isCurrent={currentAction === index}
              onMouseOver={ () => handleMouseOver(index) }
              onMouseOut={ () => handleMouseOut() }
              key={action.id} 
              className={"action-" + actions.length}
            />
          )}
        </ul> 
        {hasNext ? <span className="next-actions">{'>'}</span> : undefined}
      </div>
  )
}


const ListItem = ({id}) => {
  
  return (
    <li className={className + (isCurrent ? ' current' : '')}>
        <PixelAlign>
          <span onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{name}</span>
        </PixelAlign>
    </li>
  )
}

export default ActionsComponent
