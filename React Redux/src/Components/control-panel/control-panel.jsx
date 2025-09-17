import { useDispatch } from "react-redux"
import { resetAge, increaseAge, } from "../../Actions"
import { changeUser } from "../../Actions/change-user"

export const ControlPanel = ()=> {
    const dispatch = useDispatch()

    const onAgeIncrease = ()=> {
        dispatch(increaseAge(3))
    }
    const onAgeReset = ()=> {
        dispatch(resetAge())
    }
    const onUserChange = ()=> {
        dispatch(changeUser())
    }

    return (
        <div>
            <button onClick={onAgeIncrease}>Увеличить возраст</button>
            <button onClick={onAgeReset}>Сбросить возраст</button>
            <button onClick={onUserChange}>Сменить пользователя</button>
        </div>
    )
}