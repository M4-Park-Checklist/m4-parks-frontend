describe('NPS Service App', () => {
  beforeEach(() => {
    cy.viewport(1600, 1000)
    cy.intercept('GET', "https://developer.nps.gov/api/v1/parks?api_key=jR5uonh1B6R19iLhdweq7nHBs0uGgKgwzqn3BNfb&limit=500", {
      fixture: 'parks.json'
    })
      .as("getParks")

    cy.visit('http://localhost:3000/');
    cy.wait("@getParks")
  })

  context('Checklist View', () => {
    it('Should show you two parks', () => {
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Boston African American National Historic Site');
    });

    it("Should let you click a dropdown menu for the states", () => {
      cy.get('.state-selector select').select('MA');
      cy.get('.state-selector select').should('have.value', 'MA');
    })

    it('Should increment number of parks visited when checkboxes are clicked', () => {
      cy.get('.checkbox-list li:first-child input[type="checkbox"]').check();
      cy.contains('1/2 parks visited');
      cy.get('.checkbox-list li:nth-child(2) input[type="checkbox"]').check();
      cy.contains('2/2 parks visited');
    });

    it('Should navigate to /MA when Go button is clicked', () => {
      cy.get('.state-selector select').select('MA');
      cy.get('.state-selector button').click();
      cy.url().should('eq', 'http://localhost:3000/Parks/MA');
    });
  });

  context('Parks/MA View', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('MA');
      cy.get('.state-selector button').click();
    });
  
    it('Should display one park with correct details', () => {
      cy.get('.card-grid .park-card').should('have.length', 1);
      cy.get('.park-card').within(() => {
        cy.get('h2').should('contain', 'Boston African American National Historic Site');
        cy.get('p').should('contain', 'State: MA');
        cy.get('.image-container img').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C790A8C-1DD8-B71B-0BB037E9568998D1.jpg');
        cy.get('.image-container img').should('have.attr', 'alt', 'View from the pulpit at the African Meeting House');
        cy.get('h3').should('contain', 'Description');
        cy.get('p').should('contain', 'Centered on the north slope of Beacon Hill, the African American community of 1800s Boston led the city and the nation in the fight against slavery and injustice. These remarkable men and women, together with their allies, were leaders in the Abolition Movement, the Underground Railroad, the Civil War, and the early struggle for equal rights and education.');
      });
    });
    it('Should navigate to park details page when "See More!" button is clicked', () => {
      cy.get('.park-card button').click();
      cy.url().should('eq', 'http://localhost:3000/Parks/MA/87F00684-8E1F-4E12-B463-2B5B929A0C74');
    });
  });

  context('Individual Park View 1', () =>{
    beforeEach(() => {
      cy.get('.state-selector select').select('MA');
      cy.get('.state-selector button').click();
      cy.get('.park-card button').click();
    });
    it('Should display park details correctly', () => {
      cy.get('.park-details-title .single-title').should('contain', 'Boston African American National Historic Site');
  
      cy.get('.image-container .single-image').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C790CB4-1DD8-B71B-0B29F4B5171A78B3.jpg');
  
      // Check park activities (We will fill this in later)
      // cy.get('.park-details-activities p').should('contain', foundPark.activities.join(', '));
  
      cy.get('.park-details-weather p').should('contain', 'Boston African American National Historic Site is located in downtown Boston which can see extreme cold in the winter months, as well as extreme heat and humidity throughout the summer months. Walking tours may be cancelled during severe heat and/or weather events.');
    });

    it('Should navigate back to checklist view when back button is clicked twice', () => {
      cy.go('back');
      cy.go('back');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Boston African American National Historic Site');
    });
  })

  context('Parks/KY View', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('KY');
      cy.get('.state-selector select').should('have.value', 'KY');
      cy.get('.state-selector button').click();
    });
  
    it('Should display one park with correct details', () => {
      cy.get('.card-grid .park-card').should('have.length', 1);
      cy.get('.park-card').within(() => {
        cy.get('h2').should('contain', 'Abraham Lincoln Birthplace National Historical Park');
        cy.get('p').should('contain', 'State: KY');
        cy.get('.image-container img').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg');
        cy.get('.image-container img').should('have.attr', 'alt', 'The Memorial Building surrounded by fall colors');
        cy.get('h3').should('contain', 'Description');
        cy.get('p').should('contain', 'For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky\'s frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country\'s first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.');
      });
    });
  
    it('Should navigate to park details page when "See More!" button is clicked', () => {
      cy.get('.park-card button').click();
      cy.url().should('eq', 'http://localhost:3000/Parks/KY/77E0D7F0-1942-494A-ACE2-9004D2BDC59E');
    });
  });
  
  context('Individual Park View 2', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('KY');
      cy.get('.state-selector button').click();
      cy.get('.park-card button').click();
    });
  
    it('Should display park details correctly', () => {
      cy.get('.park-details-title .single-title').should('contain', 'Abraham Lincoln Birthplace National Historical Park');
  
      cy.get('.image-container .single-image').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg');
  
      // Check park activities (We will fill this in later)
      // cy.get('.park-details-activities p').should('contain', foundPark.activities.join(', '));
  
      cy.get('.park-details-weather p').should('contain', 'There are four distinct seasons in Central Kentucky. However, temperature and weather conditions can vary widely within those seasons. Spring and Fall are generally pleasant with frequent rain showers. Summer is usually hot and humid. Winter is moderately cold with mixed precipitation.');
    });
  
    it('Should navigate back to checklist view when back button is clicked twice', () => {
      cy.go('back');
      cy.go('back');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Boston African American National Historic Site');
    });
  });
})