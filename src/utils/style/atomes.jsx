
import colors from '../../utils/style/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    color: white; 
    border-radius: 30px; 
    ${(props) =>
        props.$isFullLink &&
        `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`
