describe("Movies Search Page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/movies");
    cy.contains("Search").click();
  });

  it("can be opened", function () {
    cy.contains("Search movies");
  });

  it("shows search result matching the keyword", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
  });

  it("hides previous search after new search", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
    cy.get("input").clear();
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates").should("not.exist");
  });

  it("opens the movie page when movie picture is clicked", function () {
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.get(".table-item-pic").eq(0).click()
    cy.contains("Your rating:")
  })

  it("opens the movie page when movie title is clicked", function () {
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.get(".table-item-title").eq(0).click()
    cy.contains("Your rating:")
  })

  describe("shows movies in correct order after", function(){
    beforeEach(function () {
      cy.get("input").type("harry potter");
      cy.get("[data-testid='SearchIcon']").click()
    })

    it("sorting by oldest first", function (){
        cy.wait(1000)
        cy.contains("Harry Potter and the Philosopher's Stone")
        cy.contains("release oldest first").click()
        cy.wait(1000)
        cy.get(".table-item").eq(0).contains("Harry Potter and the Philosopher's Stone")
        cy.get(".table-item").eq(1).contains("Harry Potter and the Chamber of Secrets")
    })

    it("sorting by newest first", function (){
      cy.wait(1000)
      cy.contains("Harry Potter and the Philosopher's Stone")
      cy.contains("release newest first").click()
      cy.wait(1000)
      cy.get(".table-item").eq(0).contains("Harry Potter 20th Anniversary: Return to Hogwarts ")
      cy.get(".table-item").eq(1).contains("Harry Potter: A History Of Magic")
  })

    it("sorting by title descending", function (){
      cy.wait(1000)
      cy.contains("The Greater Good - Harry Potter Fan Film")
      cy.contains("title Z-A").click()
      cy.wait(1000)
      cy.get(".table-item").eq(0).contains("The Greater Good - Harry Potter Fan Film")
      cy.get(".table-item").eq(1).contains("Harry Potter: A History Of Magic")
    })

    it("sorting by title ascending", function (){
      cy.wait(1000)
      cy.contains("Harry Potter and the Chamber of Secrets")
      cy.contains("title A-Z").click()
      cy.wait(1000)
      cy.get(".table-item").eq(0).contains("Harry Potter 20th Anniversary: Return to Hogwarts")
      cy.get(".table-item").eq(1).contains("Harry Potter and the Chamber of Secrets")
    })
  })
});
