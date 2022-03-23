import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card/index'
import Styled from 'styled-components'
import { Loader } from '../../utils/Loader'
import colors from '../../utils/style/colors'
import { useFetch, useTheme } from '../../utils/hooks'


const CardsContainer = Styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`
 
const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`


const PageTitle = Styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = Styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

function Freelances() {

    const { theme } = useTheme();
    const { data, isLoading, error } = useFetch(`http://localhost:8000/freelances`);

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    const freelancersList = data?.freelancersList

    return (
        <div>
            <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
            <PageSubtitle theme={theme}>
                Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            {isLoading ?
            (<LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>) : 
            (
                <CardsContainer>
                    {freelancersList?.map((profile, index) => (
                        <Card
                            key={`${profile.name}-${index}`}
                            label={profile.job}
                            picture={profile.picture}
                            title={profile.name}
                        />
                    ))}
                </CardsContainer>
            )}
        </div>
    )
}

export default Freelances;