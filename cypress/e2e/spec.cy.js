describe('NPS Service App', () => {
  beforeEach(() => {
    cy.viewport(1600, 1000)
    cy.intercept('GET', "https://m4-parks-backend.onrender.com/api/v0/parks/", {
      fixture: 'parks.json'
    })
      .as("getParks")
    cy.intercept('GET', "https://m4-parks-backend.onrender.com/api/v0/parks/zion", {
      fixture: 'zion-park.json'
    })
      .as("getZion")
    cy.intercept('GET', "https://m4-parks-backend.onrender.com/api/v0/parks/abli", {
      fixture: 'abli-park.json'
    })
      .as("getAbli")
    cy.visit('http://localhost:3000/');
    cy.wait("@getParks")
  })

  context('Checklist View', () => {
    it('Should show you two parks', () => {
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Zion National Park');
    });

    it("Should let you click a dropdown menu for the states", () => {
      cy.get('.state-selector select').select('UT');
      cy.get('.state-selector select').should('have.value', 'UT');
    })

    it('Should increment number of parks visited when checkboxes are clicked', () => {
      cy.get('.checkbox-list li:first-child input[type="checkbox"]').check();
      cy.contains('1/2 parks visited');
      cy.get('.checkbox-list li:nth-child(2) input[type="checkbox"]').check();
      cy.contains('2/2 parks visited');
    });

    it('Should navigate to /UT when Go button is clicked', () => {
      cy.get('.state-selector select').select('UT');
      cy.get('.state-selector button').click();
      cy.url().should('eq', 'http://localhost:3000/Parks/UT');
    });
  });

  context('Parks/UT View', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('UT');
      cy.get('.state-selector button').click();
    });

    it('Should display one park with correct details', () => {
      cy.get('.card-grid .park-card').should('have.length', 1);
      cy.get('.park-card').within(() => {
        cy.get('h2').should('contain', 'Zion National Park');
        cy.get('p').should('contain', 'State: UT');
        cy.get('.image-container img').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/68BFC1AC-BF96-629F-89D261D78F181C64.jpg');
        cy.get('.image-container img').should('have.attr', 'alt', 'A triangular sandstone mountain overlooks green and yellow foliage. A cloudy blue sky is overhead.');
        cy.get('h3').should('contain', 'Description');
        cy.get('p').should('contain', 'Follow the paths where people have walked for thousands of years. Gaze up at massive sandstone cliffs of cream, pink, and red that soar into a brilliant blue sky. Experience wilderness in a narrow slot canyon. Zion’s unique array of plants and animals will enchant you as you absorb the rich history of the past and enjoy the excitement of present-day adventures.');
      });
    });
    it('Should navigate to park details page when "See More!" button is clicked', () => {
      cy.get('.park-card button').click();
      cy.url().should('eq', 'http://localhost:3000/Parks/UT/zion');
    });
  });

  context('Individual Park View 1', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('UT');
      cy.get('.state-selector button').click();
      cy.get('.park-card button').click();
      cy.wait("@getZion")
    });
    it('Should display park details correctly', () => {
      cy.get('.park-details-title .single-title').should('contain', 'Zion National Park');

      cy.get('.image-container .single-image').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/69162F54-D4AF-8695-A42F97A8F9774C19.jpg');

      cy.get('.park-description').should('contain', 'Follow the paths where people have walked for thousands of years.');

      cy.get('.active-alerts').should('contain', 'Kolob Canyons Road passed Taylor Creek Trailhead temporarily closed');

      cy.get('.park-details-weather').within(() => {
        cy.get('p').should('contain', 'Overcast');
        cy.get('p').should('contain', 'Temperature: 28 °F');
        cy.get('p').should('contain', 'Feels Like: 26.1 °F');
        cy.get('p').should('contain', 'Humidity: 85%');
        cy.get('p').should('have.length', 4);
      });

      cy.get('.park-details-amenities').within(() => {
        cy.get('p').should('contain', 'Accessible Rooms');
        cy.get('p').should('contain', 'Accessible Sites');
        cy.get('p').should('contain', 'Amphitheater');
        cy.get('p').should('contain', 'Assistive Listening Systems');
        cy.get('p').should('contain', 'Automated Entrance');
        cy.get('p').should('contain', 'Automated External Defibrillator (AED)');
        cy.get('p').should('contain', 'Backcountry Permits');
        cy.get('p').should('contain', 'Beach/Water Access');
        cy.get('p').should('contain', 'Benches/Seating');
        cy.get('p').should('contain', 'Bicycle - Rack');
        cy.get('p').should('have.length', 10);

      });

      cy.get('.park-details-activities').within(() => {
        cy.get('p').should('contain', 'Arts and Culture');
        cy.get('p').should('contain', 'Astronomy');
        cy.get('p').should('contain', 'Stargazing');
        cy.get('p').should('contain', 'Biking');
        cy.get('p').should('contain', 'Road Biking');
        cy.get('p').should('contain', 'Camping');
        cy.get('p').should('contain', 'Backcountry Camping');
        cy.get('p').should('contain', 'Car or Front Country Camping');
        cy.get('p').should('contain', 'Horse Camping (see also Horse/Stock Use)');
        cy.get('p').should('contain', 'Canyoneering');
        cy.get('p').should('have.length', 10);
      });
    });

    it('Should navigate back to checklist view when the page title is clicked', () => {
      cy.get('.page-title').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Zion National Park');
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
      cy.url().should('eq', 'http://localhost:3000/Parks/KY/abli');
    });
  });

  context('Individual Park View 2', () => {
    beforeEach(() => {
      cy.get('.state-selector select').select('KY');
      cy.get('.state-selector button').click();
      cy.get('.park-card button').click();
      cy.wait("@getAbli")
    });

    it('Should display park details correctly', () => {
      cy.get('.park-details-title .single-title').should('contain', 'Abraham Lincoln Birthplace National Historical Park');

      cy.get('.image-container .single-image').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg');

      cy.get('.park-description').should('contain', "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home.");

      cy.get('.active-alerts').should('contain', 'Birthplace Unit Open Daily!');
      cy.get('.active-alerts').should('contain', 'Kentucky Boyhood Home at Knob Creek Unit Visitor Center has Seasonal Hours');

      cy.get('.park-details-weather').within(() => {
        cy.get('p').should('contain', 'Partly cloudy');
        cy.get('p').should('contain', 'Temperature: 59.5 °F');
        cy.get('p').should('contain', 'Feels Like: 59.5 °F');
        cy.get('p').should('contain', 'Humidity: 64%');
        cy.get('p').should('have.length', 4);
      });

      cy.get('.park-details-amenities').within(() => {
        cy.get('p').should('contain', 'Accessible Rooms');
        cy.get('p').should('contain', 'Accessible Sites');
        cy.get('p').should('contain', 'Assistive Listening Systems');
        cy.get('p').should('contain', 'Audio Description');
        cy.get('p').should('contain', 'Automated External Defibrillator (AED)');
        cy.get('p').should('contain', 'Baby Changing Station');
        cy.get('p').should('contain', 'Benches/Seating');
        cy.get('p').should('contain', 'Bicycle - Rack');
        cy.get('p').should('contain', 'Braille');
        cy.get('p').should('contain', 'Captioned Media');
        cy.get('p').should('have.length', 10);

      });

      cy.get('.park-details-activities').within(() => {
        cy.get('p').should('contain', 'Astronomy');
        cy.get('p').should('contain', 'Stargazing');
        cy.get('p').should('contain', 'Food');
        cy.get('p').should('contain', 'Picnicking');
        cy.get('p').should('contain', 'Guided Tours');
        cy.get('p').should('contain', 'Self-Guided Tours - Walking');
        cy.get('p').should('contain', 'Hands-On');
        cy.get('p').should('contain', 'Junior Ranger Program');
        cy.get('p').should('contain', 'Wildlife Watching');
        cy.get('p').should('contain', 'Birdwatching');
        cy.get('p').should('have.length', 10);
      });
    });

    it('Should navigate back to checklist view when back button is clicked twice', () => {
      cy.go('back');
      cy.go('back');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Zion National Park');
    });
  });

  context('Bad URL testing', () => {
    it('Should take you back to the main page when you put a bad URL in', () => {
      cy.visit('http://localhost:3000/asgafgdfg');
      cy.wait(5000)
      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox-list li').should('have.length', 2);
      cy.get('.checkbox-list li:first-child').contains('Abraham Lincoln Birthplace National Historical Park');
      cy.get('.checkbox-list li:last-child').contains('Zion National Park');
    });
  })
})