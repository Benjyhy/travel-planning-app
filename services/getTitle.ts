const getTitle = (type: string) => {
   let title: string
   switch (type) {
      case 'eat':
         title = 'restaurants'
         break
      case 'sleep':
         title = 'places to sleep'
         break
      case 'drink':
         title = 'bars'
         break
      case 'enjoy':
         title = 'events'
         break
      case 'travel':
         title = 'places of locomotion'
         break
      default:
         title = 'unknown'
   }
   return title
}

export default getTitle
