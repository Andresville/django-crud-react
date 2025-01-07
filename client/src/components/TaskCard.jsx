import {useNavigate} from 'react-router-dom'

export function TaskCard({task}) {

  const navigate = useNavigate()

  return (
    <div className={`p-3 hover:cursor-pointer ${
      task.done ? "bg-green-800 hover:bg-green-700" : "bg-red-800 hover:bg-red-700"
    }`}
    
    onClick={()=>
      navigate(`/tasks/${task.id}`)
    }>
            <h2 className='font-bold uppercase'>{task.title}</h2>
            <p className='text-zinc-300'>{task.description}</p>
        </div>
  )
}

