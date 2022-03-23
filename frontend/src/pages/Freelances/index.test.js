import { rest } from 'msw'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/tests'
import Freelances from './'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

const freelanceUrl = `http://localhost:8000/freelances`

const server = setupServer(
  rest.get(freelanceUrl, (req, res, ctx) => {
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('Should display freelancers names after loader is removed', async () => {
    render(<Freelances />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})

it('Should display error content', async () => {
    server.use(
        rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ 
                    errorMessage : `Oups il y a une erreur dans l'API`
                })
            )
        })
    )

    render(<Freelances />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByTestId('error')).toMatchInlineSnapshot(`
        <span
          data-testid="error"
        >
          Oups il y a une erreur dans l'API
        </span>
    `)
})