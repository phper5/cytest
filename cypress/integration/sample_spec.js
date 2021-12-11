const Clicker = ({ click }) => (
    <div>
        <button onClick={click}>Click me</button>
    </div>
)

it('calls the click prop twice', () => {
    const onClick = cy.stub()
    // "mount" function comes from
    // https://github.com/cypress-io/cypress/tree/master/npm/react
    mount(<Clicker click={onClick} />)
    cy.get('button')
        .click()
        .click()
        .then(() => {
            // works in this case, but not recommended
            // because .then() does not retry
            expect(onClick).to.be.calledTwice
        })
})

it('calls the click prop', () => {
    const onClick = cy.stub().as('clicker')
    // "mount" function comes from
    // https://github.com/cypress-io/cypress/tree/master/npm/react
    mount(<Clicker click={onClick} />)
    cy.get('button').click().click()

    // good practice 💡
    // auto-retry the stub until it was called twice
    cy.get('@clicker').should('have.been.calledTwice')
})