import { useRecoilState } from "recoil"
import { modalState } from "../atom/modalAtom"


export default function CommentModal() {
    const [open, setopen] = useRecoilState(modalState);
  return (
    <div>
        <h1>Comment Modal</h1>
        {open && (<>Modal opened</>)}
    </div>
  )
}
