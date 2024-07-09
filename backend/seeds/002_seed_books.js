/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert(
    [
      {title: 'The Final Empire', author: 'Brandon Sanderson', description: 'In a world where ash falls from the sky, and mist dominates the night, an evil cloaks the land and stifles all life.', isbn: '076531178X', published_date: '2006-07-25', genre: 'Fantasy', availability: true},
      {title: 'The Well of Ascension', author: 'Brandon Sanderson', description: 'The impossible has been accomplished. The Lord Ruler – the man who claimed to be god incarnate and brutally ruled the world for a thousand years – has been vanquished.', isbn: '0765316889', published_date: '2007-08-21', genre: 'Fantasy', availability: true},
      {title: 'The Hero of Ages', author: 'Brandon Sanderson', description: 'Tricked into releasing the evil spirit Ruin while attempting to close the Well of Ascension, new emperor Elend Venture and his wife, the assassin Vin, are now hard-pressed to save the world from destruction.', isbn: '0765316897', published_date: '2008-10-14', genre: 'Fantasy', availability: true},
      {title: 'Elantris', author: 'Brandon Sanderson', description: 'Elantris was the capital of Arelon: gigantic, beautiful, literally radiant, filled with benevolent beings who used their powerful magical abilities for the benefit of all.', isbn: '0765350378', published_date: '2005-05-01', genre: 'Fantasy', availability: true},
      {title: 'Mistborn: The Alloy of Law', author: 'Brandon Sanderson', description: 'Centuries after the Mistborn trilogy, Scadrial is on the verge of modernity, with railroads to supplement the canals, electric lighting in the streets and the homes of the wealthy, and the first steel-framed skyscrapers racing for the clouds.', isbn: '0765330423', published_date: '2011-11-08', genre: 'Fantasy', availability: true},
      {title: 'The Name of the Wind', author: 'Patrick Rothfuss', description: 'Told in Kvothe\'s own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.', isbn: '0756404746', published_date: '2007-03-27', genre: 'Fantasy', availability: true},
      {title: 'The Wise Man\'s Fear', author: 'Patrick Rothfuss', description: 'Sequel to the extraordinary THE NAME OF THE WIND, THE WISE MAN\'S FEAR is the second installment of this superb fantasy trilogy, The Kingkiller Chronicle.', isbn: '0756407915', published_date: '2011-03-01', genre: 'Fantasy', availability: true},
      {title: 'The Slow Regard of Silent Things', author: 'Patrick Rothfuss', description: 'A companion tale to The Kingkiller Chronicle series, focusing on Auri, a mysterious character from The Name of the Wind and The Wise Man\'s Fear.', isbn: '0756410436', published_date: '2014-10-28', genre: 'Fantasy', availability: true},
      {title: 'Doors of Stone', author: 'Patrick Rothfuss', description: 'The eagerly awaited third book of The Kingkiller Chronicle.', isbn: 'Not Yet Published', published_date: 'TBA', genre: 'Fantasy', availability: false},
      {title: 'Warbreaker', author: 'Brandon Sanderson', description: 'In Warbreaker, the gods of Hallandren are reborn in the bodies of those who die in glory. But the process is not as benevolent as it seems...', isbn: '0765320304', published_date: '2009-06-09', genre: 'Fantasy', availability: true}
    ]
  );
};
