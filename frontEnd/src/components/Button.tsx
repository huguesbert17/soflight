import React, {FC, useEffect, useRef, useState} from "react"
// @ts-ignore
import styled from "styled-components";

enum btnTypes {
    submit = 'submit',
    reset = 'reset',
    button = 'button'
}

export enum rollHoverPosition {
    top_left = 'top-left',
    top_right = 'top-right',
    top_center = 'top-center',
    bottom_left = 'top-left',
    bottom_right = 'top-right',
    bottom_center = 'top-center',
}

type ButtonProps = {
    disabled?: boolean,
    submitting?: boolean,
    type?: 'button'|'submit'|'reset',
    children?: React.ReactNode,
    rollHover?: boolean,
    rollHoverPosition?: rollHoverPosition
    icon?: React.ReactNode,
    className?: string,
    title?: string,
    rollHoverStyle?: object,
    onClick?: any
}
const RollOver = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    button{
        transition: .3s ease;
        overflow: hidden;
        padding: 5px 10px!important;
        height: auto;
        width: auto;
        border-radius: 60px!important;
    }
    button > span:last-of-type{
        display: none
    }
    button:hover{
        width: auto;
        height: auto;
        > i:first-of-type{display:none}
        span:last-of-type{display:inline-block}
    }
`

const Button: React.FunctionComponent<ButtonProps> = ( props ) => {
    let icon: any = <i className="mdi mdi-plus"></i>
    if (!props.icon) icon = props.icon
    let type = 'primary'
    if (props.type) type = props.type
    if(props.rollHover) return <RollOver className="position-fixed" style={props.rollHoverStyle}>
        <button type={btnTypes[props.type ? props.type : 'button']} className={`btn ${props.className}`}>
            {icon}
            <span>{icon} {props.children}</span>
        </button>
    </RollOver>

    return <button onClick={props.onClick} disabled={props.submitting || props.disabled} type={btnTypes[props.type ? props.type : 'button']} className={`btn btn-${type}${!props.className ? ' btn-primary' : props.className}`}>
        {props.submitting && <i className="mdi mdi-loading mdi-spin"></i>}
        {props.children}
    </button>
}

interface ITwin {
    children: React.ReactNode[],
    theme?: "light" | "dark",
    activeIndex?: number
}

export const TwinButtons: FC<ITwin> = (props) => {
    const [active, setActive] = useState<{
        left?: string,
        right?: string,
        width?: string
    }>({})
    const btnRef = useRef<any>()

    useEffect(() => {
        const first = !props.activeIndex ? btnRef.current.querySelector("button, a") : btnRef.current.querySelectorAll("button, a")[props.activeIndex]

        if (!first) return
        let left = first.offsetLeft + 2
        if (props.activeIndex !== undefined) {
            left = first.offsetLeft
            if (props.activeIndex === props.children.length - 1) left = first.offsetLeft - 2
        }

        setActive({
            left: `${left}px`,
            width: `${first.offsetWidth + 6}px`
        })
    }, [])

    const handleClick = (e: any, index: number) => {
        let params: any = {}
        if (index === 0) {
            params = {...params, left: `${e.currentTarget.offsetLeft + 2}px`, width: `${e.currentTarget.offsetWidth + 2}px`}
        } else if (index === props.children.length - 1) {
            params = {...params, left: `${e.currentTarget.offsetLeft + 2}px`, width: `${e.currentTarget.offsetWidth}px`}
        }else{
            params = {...params, left: `${e.currentTarget.offsetLeft + 1}px`, width: `${e.currentTarget.offsetWidth + 2}px`}
        }
        setActive(params)
    }


    return <Init theme={props.theme}>
        <Wrapper ref={btnRef}>
            {props.children.map((bt, index) => <ButtonWrapper key={index} theme={props.theme} onClick={(e: any) => handleClick(e, index)}>
                {bt}
            </ButtonWrapper>)}
        </Wrapper>
        <Indicator style={{...active}}/>
    </Init>
}

const Init = styled.div<any>`
    background: ${(props: any) => props.theme === "dark" ? "#161616" : "#efefef"};
    display: inline-block;
    position: relative;
    padding: 2px;
    border-radius: 6px;
    overflow: hidden;
    height: 33.8px;
`

const Wrapper = styled.div`
    display: flex;
    gap: 0.4rem;
    //margin: 3px 0;
    z-index: 1;
    position: relative;
`

const Indicator = styled.div`
    background: ${(props: any) => props.theme === "dark" ? "#2b2b2b" : "#fff"};
    border-radius: 5px;
    position: absolute;
    height: 30px;
    top: 2px;
    transition: all .3s ease;
    box-shadow: 0 10px 15px -3px rgb(39 39 42 / 5%), 0 4px 6px -4px rgb(39 39 42 / 5%);
`

const ButtonWrapper = styled.div<any>`
    padding: 2px;
    button, a, span, div {
        background: none;
        border: none;
        outline: none;
        user-select: none;
        padding: 1px 6px;
        color: ${(props: any) => props.theme === "dark" ? "#adadad" : "#6c757d"};
    }
    a {
        padding: 3px 4px
    }
`

export default Button
