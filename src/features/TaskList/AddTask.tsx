import { append } from 'ramda'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { maxIdState, projectState } from '../../state'

export default function AddTask({ projectId }: { projectId: number }) {
  const setProject = useSetRecoilState(projectState(projectId))
  const maxId = useRecoilValue(maxIdState)
  const [adding, setAdding] = React.useState(false)
  const [taskName, setTaskName] = React.useState('')
  const addTask = () => {
    if (taskName.length !== 0) {
      setProject((project) => ({
        ...project,
        tasks: append(
          {
            kind: 'Task',
            id: maxId + 1,
            name: taskName,
            checked: false,
          },
          project.tasks
        ),
      }))
      setAdding(false)
      setTaskName('')
    }
  }
  if (!adding) {
    return (
      <div
        style={{
          color: '#aaa',
          padding: '8px',
          paddingLeft: '0px',
          paddingTop: '8px',
        }}
      >
        <span>
          <Add
            style={{
              color: '#de4c4a',
              fontSize: 18,
              verticalAlign: 'middle',
              marginRight: '8px',
            }}
          />
        </span>
        <span style={{ fontSize: 14 }} onClick={() => setAdding(true)}>
          Add task
        </span>
      </div>
    )
  } else {
    return (
      <div
        style={{
          color: '#aaa',
          padding: '8px',
          paddingLeft: '0px',
          paddingTop: '0px',
          flexGrow: 1,
        }}
      >
        <div>
          <div style={{ padding: '6px', paddingLeft: 0, paddingRight: 0 }}>
            <TextField
              variant='outlined'
              size='small'
              autoFocus
              style={{ width: '100%' }}
              inputProps={{ style: { padding: '6px' } }}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Escape') {
                  setAdding(false)
                  setTaskName('')
                } else if (e.key === 'Enter') {
                  addTask()
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          </div>
          <div style={{ padding: '0px' }}>
            <Button
              variant='contained'
              size='small'
              disabled={taskName.length === 0}
              onClick={addTask}
            >
              Add Task
            </Button>
            <Button
              onClick={() => setAdding(false)}
              size='small'
              style={{ color: '#aaa', marginLeft: '6px' }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
