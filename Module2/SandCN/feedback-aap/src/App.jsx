import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: ""
  })
  const [submitted, setSubmitted] = useState(null)

  const [imageIndex, setImageIndex] = useState(0)

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const images = [
    "https://via.placeholder.com/300?text=Image+1",
    "https://via.placeholder.com/300?text=Image+2",
    "https://via.placeholder.com/300?text=Image+3"
  ]

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitFeedback = () => {
    setSubmitted(form)
    setForm({ name: "", email: "", feedback: "" })
  }

  const nextImage = () => {
    setImageIndex((imageIndex + 1) % images.length)
  }

  const prevImage = () => {
    setImageIndex((imageIndex - 1 + images.length) % images.length)
  }

  const addTodo = () => {
    if (!todo.trim()) return
    setTodos([...todos, { text: todo, done: false }])
    setTodo("")
  }

  const toggleTodo = (index) => {
    const updated = [...todos]
    updated[index].done = !updated[index].done
    setTodos(updated)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Feedback Form</h2>

          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleFormChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleFormChange}
          />

          <Textarea
            name="feedback"
            placeholder="Feedback"
            value={form.feedback}
            onChange={handleFormChange}
          />

          <Button onClick={submitFeedback}>Submit</Button>

          {submitted && (
            <div className="text-sm pt-2">
              <p>Name: {submitted.name}</p>
              <p>Email: {submitted.email}</p>
              <p>Feedback: {submitted.feedback}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 text-center">
          <h2 className="text-lg font-semibold">Image Slideshow</h2>

          <img src={images[imageIndex]} alt="slide" className="mx-auto" />

          <div className="flex justify-center gap-4">
            <Button onClick={prevImage}>Previous</Button>
            <Button onClick={nextImage}>Next</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Todo List</h2>

          <div className="flex gap-2">
            <Input
              placeholder="Add todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <div className="space-y-2">
            {todos.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox
                  checked={item.done}
                  onCheckedChange={() => toggleTodo(index)}
                />
                <span className={item.done ? "line-through" : ""}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
