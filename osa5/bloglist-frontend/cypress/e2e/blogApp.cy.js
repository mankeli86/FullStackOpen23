describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test Man',
      username: 'test',
      password: '123'
    }
    const user2 = {
      name: 'Test Man 2',
      username: 'tester',
      password: '123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)  
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Test Man logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('aaa')
      cy.get('#password').type('aaa')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
      cy.contains('test author')
    })
  })

  describe('When logged in and one blog is added', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()
    })

    it('a blog can be liked', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('user can remove a blog they have added', function() {
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.contains('test title').should('not.exist')
    })

    it('user can not remove a blog they have not added', function() {
      cy.get('#logout-button').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      
      cy.contains('Test Man 2 logged in')
      cy.get('#view-button').click()
      cy.get('#remove-button').should('not.exist')
    })
  })

  describe('When logged in and three blogs are added', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      const createBlog = (title, author, url) => {
        cy.get('button').contains('new blog').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#url').type(url)
        cy.get('#create-button').click()
      }

      createBlog('test title', 'test author', 'test url')
      createBlog('test title 2', 'test author 2', 'test url 2')
      createBlog('test title 3', 'test author 3', 'test url 3')
    })

    it('blogs are correctly sorted by likes', function() {
      cy.get('.blog').eq(0).should('contain', 'title')
      cy.get('.blog').eq(1).should('contain', 'title 2')
      cy.get('.blog').eq(2).should('contain', 'title 3')

      cy.get('.blog').eq(2).find('#view-button').click()
      cy.get('#like-button').click()

      cy.get('.blog').eq(0).should('contain', 'title 3')
      cy.get('.blog').eq(1).should('contain', 'title')
      cy.get('.blog').eq(2).should('contain', 'title 2')
    })
  })
})