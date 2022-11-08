import styled from "styled-components/native";

export const TextInput = styled.TextInput<{ lastone: boolean }>`
    color:white;
    background-color: rgba(255,255,255,0.15);
    padding:15px 7px;
    margin-bottom: ${props => props.lastone ? 15 : 8}px;
    border-radius: 4px;
    width: 100%;
`
