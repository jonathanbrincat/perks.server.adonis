'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


const mock = [
  {
    'id': 1,
    'title': 'Stunning Silver Point kittens',
    'body': 'Simply gorgeous blue-eyed and sprightly litter of silver British Shorthair kittens. Available end of October. Parents are TICA registered. Kittens are actively engaged in family life, raised on wet and dry food and will be litter trained. Kittens will be health-checked, vaccinated and treated for fleas & worms prior to release. They will also be microchipped.'
  },
  {
    'id': 2,
    'title': 'TICA registered Bengal cat',
    'body': 'Handsome Bengal cat in need of rehoming owing to a change in circumstances that means I simply can not afford him the loving time and devotion he deserves.'
  },
  {
    'id': 3,
    'title': 'Adorable brood of tabby kittens',
    'body': 'Lineage is unknown. My little Lottie was very naughty and had a night of passion with one of the local Tommies and these fuzzballs are the result.'
  },
  {
    'id': 4,
    'title': 'French Bulldog pup',
    'body': 'some text 4'
  },
  {
    'id': 5,
    'title': 'German Shepherd',
    'body': 'some text 5'
  },
  {
    'id': 6,
    'title': 'Mini Lop bucks',
    'body': 'I have a couple of male Mini Lop available to a good home.'
  },
  {
    'id': 7,
    'title': 'Netherland Dwarf',
    'body': 'Beautiful Netherland Dwarf baby bunnies available to reserve.'
  },
  {
    'id': 8,
    'title': 'Chocolate And black Lab puppies',
    'body': 'Our amazing girl has given birth to a healthy litter of 5. 1 female and 4 male. All still available to reserve. Pups will be ready to leave from 15th November. Not KC registered.'
  },
  {
    'id': 9,
    'title': 'Blue British Shorthair',
    'body': 'We have beautiful British Shorthair kittens who are looking for forever loving pet homes. Two boys and one girl.'
  },
  {
    'id': 10,
    'title': 'Cross Maine Coon and Bengal kittens',
    'body': 'Boy and girl.'
  },
]

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const Database = use('Database')
// const PostModel = use('App/Models/Post')

class PostSeeder {
  static async run () {
    console.log('3 --> POST SEEDER')

    //ref example 1
    /*await Database.table('posts').insert(mock)*/

    //ref example 2
    /*mock.forEach( (entry) => {
      //.insert(entry)
      //OR using Lucid
      //.model("App/Models/Post").create()
    })*/

    //ref example 3
    /*Database.table('posts').delete()
    $json = File::get('database/data/data.json')
    $data = json_decode($json)
    foreach($data as $obj) {
      WestworldCast::create(array(
        'character_name' => $obj->character_name,
        'role' => $obj->role,
        'played_by' => $obj->played_by
       ))
    }*/

    //test 1 - working
    /*for(const foo of mock) {
      await Factory
        .model('App/Models/Post')
        .create(foo)
    }*/

    //test 3 - working
    /*const $posts = await Factory
      .model('App/Models/Post')
      .createMany(mock.length, mock);*/

    /*for(const post of posts) {
      console.log(post.id)
      const $user = await Factory.model('App/Models/User').make()

      await $user.posts().save(post)
      // await post.user().save($user)
    }*/

    /*const $user = await Factory.model('App/Models/User').create()
    const $post = await Factory.model('App/Models/Post').make()

    await $user.posts().save($post)
    await $post.tags().attach([1])*/

    // DEVNOTE: when you run adonis migration:run --seed
    // the order of the seeding is not definable. I thought seed files would be executed in respects to their migrations but they are not. I think the sequence is in alphabetical order(console.logs confirm this suspicion)
    // this means something like the UserSeeder gets called at the end rather than the beginning.
    // when relationships are asserted this is a problem as the data hasn't been seeded it doesn't exist
    // the workaround is to use individual commands when seeding i.e. adonis seed --files=UserSeeder.js

    //create post
    const $post1 = await Factory.model('App/Models/Post').create()
    //attach to tags
    await $post1.tags().attach([1])
    //associate to user
    const User1 = use('App/Models/User')
    const $user1 = await User1.find(1)
    await $post1.user().associate($user1)

    const $post2 = await Factory.model('App/Models/Post').create()
    await $post2.tags().attach([1])
    const User2 = use('App/Models/User')
    const $user2 = await User2.find(2)
    await $post2.user().associate($user2)

    const $post3 = await Factory.model('App/Models/Post').create()
    await $post3.tags().attach([2])
    const User3 = use('App/Models/User')
    const $user3 = await User3.find(1)
    await $post3.user().associate($user3)
  }
}

module.exports = PostSeeder
