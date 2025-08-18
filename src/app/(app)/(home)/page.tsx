import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div>
        <Button variant='elevated'>Hello</Button>
      </div>
      <div>
        <Input placeholder='Hello' />
      </div>
      <div>
        <Progress value={50} />
      </div>
      <div>
        <Textarea placeholder='Hello' />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  )
}
