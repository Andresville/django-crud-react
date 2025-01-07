import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTasks } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('Task updated successfully!', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      });
    } else {
      await createTask(data);
      toast.success('Task created successfully!', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      });
    }
    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTasks(params.id);
        setValue('title', res.data.title);
        setValue('description', res.data.description);
        setValue('done', res.data.done);
      }
    }
    loadTask();
  }, [params.id, setValue]);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Title is required</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Description is required</span>}

        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            {...register("done")}
            className="mr-2"
          />
          <label className="text-slate-400">Mark as Done</label>
        </div>

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm('Are you sure?');
              if (accepted) {
                await deleteTask(params.id);
                toast.success('Task deleted successfully!', {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff"
                  }
                });
                navigate('/tasks');
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
