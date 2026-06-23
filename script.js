/**
 * SAVIO — iOS-native digital menu
 * Tabs: Getränke | Speisen | Suche
 * Legal: footer links → bottom sheet
 */

const MENU_DATA = {
  "categories": [
    {
      "id": "savio-organics",
      "name": "SAVIO × Red Bull Organics",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🔴",
      "items": [
        { "id": "d001", "name": "Green Sunset", "price": 8.50, "ingredients": "Midori, Red Bull SUMMER Edition", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d002", "name": "Tropical Affair", "price": 8.50, "ingredients": "Passoa, Red Bull SUMMER Edition", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d003", "name": "Pink Voltage", "price": 8.50, "ingredients": "Sarti, Red Bull SUMMER Edition", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d004", "name": "Peach Bliss", "price": 8.50, "ingredients": "Sarti, the ORGANICS by Red Bull fizzy peach", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d005", "name": "Minty Summer Mojito", "price": 10.50, "ingredients": "Havana Rum, brauner Rohrzucker, Limetten, Minze, Crushed Ice, the ORGANICS by Red Bull minty Blackberry", "tags": ["alcoholic", "cocktail", "signature", "popular"] },
        { "id": "d006", "name": "Red Hugo", "price": 8.50, "ingredients": "Prosecco, Limettensaft, Holundersirup, Minze, the ORGANICS by Red Bull minty Blackberry", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d007", "name": "Bitter Bunny", "price": 8.50, "ingredients": "the ORGANICS by Red Bull bitter Lemon, Tequila", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d008", "name": "Black Seli", "price": 8.50, "ingredients": "the ORGANICS by Red Bull black Orange, Peachtree", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d009", "name": "Pinky Promise by Sara Salkanovic", "price": 8.50, "ingredients": "the ORGANICS by Red Bull purple Berry, Passoa", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d010", "name": "Flying Haider", "price": 10.50, "ingredients": "the ORGANICS by Red Bull ginger Ale, Whiskey, Rohrzucker, Limettensaft", "tags": ["alcoholic", "cocktail", "signature"] }
      ]
    },
    {
      "id": "cocktails",
      "name": "Cocktails",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🍹",
      "items": [
        { "id": "d100", "name": "Caipirinha", "price": 10.50, "ingredients": "Cachaca, brauner Rohrzucker, Limetten, Crushed Ice", "tags": ["alcoholic", "cocktail", "popular"] },
        { "id": "d101", "name": "Mojito", "price": 10.50, "ingredients": "Havana Rum, brauner Rohrzucker, Limetten, Minze, Crushed Ice", "tags": ["alcoholic", "cocktail", "popular"] },
        { "id": "d102", "name": "BiG SAVIO MOJITO", "price": 15.90, "ingredients": "Havana Rum, brauner Rohrzucker, Limetten, Minze, Crushed Ice (groß)", "tags": ["alcoholic", "cocktail", "signature", "popular"] },
        { "id": "d103", "name": "Cuba Libre", "price": 10.50, "ingredients": "Havana Rum, Limetten, Cola", "tags": ["alcoholic", "cocktail"] },
        { "id": "d104", "name": "Mai Tai", "price": 11.50, "ingredients": "Havana Rum, Varadero Rum, Mandelsirup, Limetten- & Ananassaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d105", "name": "Lime Express", "price": 13.50, "ingredients": "Captain Morgan, Malibu, Limettensaft, Blue Curacao, Ananassaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d106", "name": "Sex on the Beach", "price": 10.50, "ingredients": "Wodka, Pfirsichlikör, Orangen- & Cranberrysaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d107", "name": "Cosmopolitan", "price": 10.50, "ingredients": "Wodka, Orangenlikör, Limetten- & Cranberrysaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d108", "name": "White Russian", "price": 10.90, "ingredients": "Wodka, Kaffeelikör, Obers", "tags": ["alcoholic", "cocktail"] },
        { "id": "d109", "name": "Tequila Sunrise", "price": 10.50, "ingredients": "Tequila, Orangen-, Zitronen- & Cranberrysaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d110", "name": "Pina Colada", "price": 10.50, "ingredients": "Varadero Rum, Kokoslikör, Obers, Ananassaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d111", "name": "Swimming Pool", "price": 10.50, "ingredients": "Havana Rum, Wodka, Blue Curacao, Obers, Ananassaft, Kokoslikör", "tags": ["alcoholic", "cocktail"] },
        { "id": "d112", "name": "Zombie", "price": 17.90, "ingredients": "Havana Rum, Coruba Rum, Varadero Rum, Orangenlikör, Tequila, Ananassaft, Läuterzucker, Grenadine", "tags": ["alcoholic", "cocktail"] },
        { "id": "d113", "name": "Melon Zombie", "price": 15.90, "ingredients": "Rum, Melonenlikör, Passionsfrucht Sirup, Ananassaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d114", "name": "Long Island Ice Tea", "price": 17.90, "ingredients": "Wodka, Gin, Havana Rum, brauner Rum, Orangenlikör, Tequila, Limettensaft, Cola, Läuterzucker", "tags": ["alcoholic", "cocktail"] },
        { "id": "d115", "name": "Espresso Martini", "price": 10.50, "ingredients": "Wodka, Kaffeelikör, Espresso", "tags": ["alcoholic", "cocktail", "popular"] },
        { "id": "d116", "name": "Averna Sour", "price": 9.50, "ingredients": "Averna, Zitronensaft, Soda", "tags": ["alcoholic", "cocktail"] },
        { "id": "d117", "name": "Justin Bieber", "price": 35.00, "ingredients": "Bacardi Rum, Wodka, Gin, Peachtree, Erdbeersirup, Erdbeersaft, Whiskey, Triple Sec, Malibu, Läuterzucker, Maracujasirup, Orangensaft, Crushed Ice, Midori, Apfelsaft", "tags": ["alcoholic", "cocktail", "popular"] },
        { "id": "d118", "name": "Kupfadachl (Moscow Mule)", "price": 10.50, "ingredients": "the ORGANICS by Red Bull ginger Beer, Wodka, Limettensaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d119", "name": "Whiskey Sour", "price": 9.50, "ingredients": "Whiskey, Zitronensaft, Soda", "tags": ["alcoholic", "cocktail"] },
        { "id": "d120", "name": "Vanessa's Secret Lover", "price": 10.50, "ingredients": "top secret 🤫", "tags": ["alcoholic", "cocktail", "signature"] },
        { "id": "d121", "name": "Porn Star Martini aka GerHARD Kroisz", "price": 13.50, "ingredients": "Wodka, Passoa, Monin Vanillesirup, A-Nobis Street Art brut, Limettensaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d122", "name": "Dr. Negroni", "price": 13.50, "ingredients": "Gin, Campari, Noilly Prat Vermouth", "tags": ["alcoholic", "cocktail"] },
        { "id": "d123", "name": "Primarius Boulevardier", "price": 13.50, "ingredients": "Whiskey, Campari, Noilly Prat Vermouth", "tags": ["alcoholic", "cocktail"] },
        { "id": "d124", "name": "Harvey Wallbanger", "price": 12.50, "ingredients": "Wodka, Galliano Liqueur Vanilla, Orangensaft", "tags": ["alcoholic", "cocktail"] },
        { "id": "d125", "name": "Joy's Choice", "price": 10.50, "ingredients": "Aperol, Zitronensaft, Orangensaft, Zuckersirup", "tags": ["alcoholic", "cocktail"] }
      ]
    },
    {
      "id": "mocktails",
      "name": "Alkoholfreie Cocktails",
      "type": "drinks",
      "alcoholic": false,
      "emoji": "🌿",
      "items": [
        { "id": "d200", "name": "Virgin on the Beach", "price": 8.50, "ingredients": "Pfirsichsirup, Orangen- & Cranberrysaft", "tags": ["non-alcoholic", "mocktail"] },
        { "id": "d201", "name": "Coconut Kiss", "price": 8.50, "ingredients": "Obers, Kokossirup, Orangen- & Ananassaft", "tags": ["non-alcoholic", "mocktail"] },
        { "id": "d202", "name": "Yellow Runner", "price": 8.50, "ingredients": "Zitronen-, Ananas- & Limettensaft, Mandelsirup", "tags": ["non-alcoholic", "mocktail", "vegan"] },
        { "id": "d203", "name": "Florida", "price": 8.50, "ingredients": "Orangen-, Maracuja- & Limettensaft, Grenadine", "tags": ["non-alcoholic", "mocktail", "vegan"] },
        { "id": "d204", "name": "Fancy Soda", "price": 8.50, "ingredients": "Mandelsirup, Blue Curacao, Zitronensaft, Soda", "tags": ["non-alcoholic", "mocktail", "vegan"] },
        { "id": "d205", "name": "Lollipop", "price": 8.50, "ingredients": "Kokossirup, Erdbeersirup, Obers, Orangen- & Ananassaft", "tags": ["non-alcoholic", "mocktail"] },
        { "id": "d206", "name": "Virgin Mojito", "price": 8.50, "ingredients": "Limetten, Minze, Ginger Ale, Crushed Ice, brauner Rohrzucker", "tags": ["non-alcoholic", "mocktail", "vegan"] },
        { "id": "d207", "name": "Big Virgin Mojito", "price": 11.50, "ingredients": "Limetten, Minze, Ginger Ale, Crushed Ice, brauner Rohrzucker", "tags": ["non-alcoholic", "mocktail", "vegan"] }
      ]
    },
    {
      "id": "spritz-wein",
      "name": "Spritz & Wein",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🥂",
      "items": [
        { "id": "d300", "name": "Hugo mit A-Nobis Street Art brut", "price": 7.50, "ingredients": "Prosecco, Holundersirup, Minze, Soda", "tags": ["alcoholic", "spritz", "popular"] },
        { "id": "d301", "name": "Aperol mit A-Nobis Street Art brut", "price": 7.50, "ingredients": "Aperol, Prosecco", "tags": ["alcoholic", "spritz", "popular"] },
        { "id": "d302", "name": "Sarti Rosa Spritz", "price": 7.50, "description": "Sarti Rosa begeistert mit intensiv pinker Farbe, Zitrus- und Blutorangenoten sowie tropischen Nuancen wie Mango und Passionsfrucht", "ingredients": "Sarti Rosa, A-Nobis Street Art brut, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d303", "name": "Very Berry White", "price": 8.50, "ingredients": "the ORGANICS by Red Bull purple Berry, Lillet Blanc", "tags": ["alcoholic", "spritz"] },
        { "id": "d304", "name": "Very Berry Red", "price": 8.50, "ingredients": "the ORGANICS by Red Bull purple Berry, Lillet Rosé", "tags": ["alcoholic", "spritz"] },
        { "id": "d305", "name": "Sommerspritzer", "price": 5.50, "ingredients": "Weißerspritzer mit Aprikosen-, Lavendel-, Litschi- oder Pink Grapefruit Geschmack", "tags": ["alcoholic", "spritz"] },
        { "id": "d306", "name": "Helga", "price": 5.50, "description": "Hugo (gemischt mit Schankwein) mit Rotwein Topping", "ingredients": "Weißwein, Holundersirup, Rotwein-Topping", "tags": ["alcoholic", "spritz"] },
        { "id": "d307", "name": "Hilde", "price": 5.50, "description": "Weißer Spritzer mit Zuckermelone Geschmack", "ingredients": "Weißwein, Zuckermelone Sirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d308", "name": "Herta", "price": 5.50, "description": "Weißer Spritzer mit Wassermelone Geschmack", "ingredients": "Weißwein, Wassermelone Sirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d309", "name": "Erdbeer Spritzer", "price": 5.50, "ingredients": "Weißwein, Erdbeersirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d310", "name": "Pfirsich Spritzer", "price": 5.50, "ingredients": "Weißwein, Pfirsichsirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d311", "name": "Cranberry Spritzer", "price": 5.50, "ingredients": "Weißwein, Cranberrysaft, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d312", "name": "Ribiselspritzer", "price": 3.50, "ingredients": "Weißwein, Ribiselsirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d313", "name": "Limetten Gin Spritzer", "price": 8.50, "ingredients": "Gin, Limettensirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d314", "name": "Erdbeer Gin Spritzer", "price": 8.50, "ingredients": "Gin, Erdbeersirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d315", "name": "Maracuja Gin Spritzer", "price": 8.50, "ingredients": "Gin, Maracujasirup, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d316", "name": "Hauswein", "price": 2.80, "volume": "1/8", "ingredients": "Wein des Hauses", "tags": ["alcoholic", "wine"] },
        { "id": "d317", "name": "Wein des Monats (Glass)", "price": 4.50, "volume": "1/8", "description": "Weingut Jurtschitsch, Langenlois, Grüner Veltliner — vital, fruchtbetont", "ingredients": "Grüner Veltliner, Jurtschitsch", "tags": ["alcoholic", "wine"] },
        { "id": "d318", "name": "Wein des Monats (Flasche)", "price": 19.00, "description": "Weingut Jurtschitsch, Langenlois, Grüner Veltliner", "ingredients": "Grüner Veltliner, Jurtschitsch", "tags": ["alcoholic", "wine"] },
        { "id": "d319", "name": "Spritzer Weiß/Rot", "price": 2.80, "ingredients": "Wein, Soda", "tags": ["alcoholic", "spritz"] },
        { "id": "d320", "name": "Kaiserspritzer", "price": 3.80, "ingredients": "Weißwein, Mineralwasser", "tags": ["alcoholic", "spritz"] },
        { "id": "d321", "name": "3er Mischung (klein)", "price": 3.30, "ingredients": "Dreier Mischung, klein", "tags": ["alcoholic", "spritz"] },
        { "id": "d322", "name": "3er Mischung (groß)", "price": 6.60, "ingredients": "Dreier Mischung, groß", "tags": ["alcoholic", "spritz"] },
        { "id": "d323", "name": "Tiroler (klein)", "price": 3.30, "ingredients": "Tiroler Mischung, klein", "tags": ["alcoholic", "spritz"] },
        { "id": "d324", "name": "Tiroler (groß)", "price": 6.60, "ingredients": "Tiroler Mischung, groß", "tags": ["alcoholic", "spritz"] },
        { "id": "d325", "name": "fritz-spritz Weinspritzer (0,25)", "price": 3.30, "ingredients": "Wein gemischt mit fritz-limo ORANGE", "tags": ["alcoholic", "spritz"] },
        { "id": "d326", "name": "fritz-spritz Weinspritzer (0,5)", "price": 6.60, "ingredients": "Wein gemischt mit fritz-limo ORANGE", "tags": ["alcoholic", "spritz"] }
      ]
    },
    {
      "id": "longdrinks",
      "name": "Long Drinks",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🥃",
      "items": [
        { "id": "d400", "name": "Jacky Cola", "price": 7.10, "ingredients": "Jack Daniel's, Cola", "tags": ["alcoholic", "longdrink"] },
        { "id": "d401", "name": "Roter Wodka Soda", "price": 6.50, "ingredients": "Roter Wodka, Soda", "tags": ["alcoholic", "longdrink"] },
        { "id": "d402", "name": "Bacardi Cola", "price": 6.80, "ingredients": "Bacardi Rum, Cola", "tags": ["alcoholic", "longdrink"] },
        { "id": "d403", "name": "Rum Cola", "price": 6.80, "ingredients": "Rum, Cola", "tags": ["alcoholic", "longdrink"] },
        { "id": "d404", "name": "Whiskey Energy", "price": 6.80, "ingredients": "Whiskey, Energy Drink", "tags": ["alcoholic", "longdrink"] },
        { "id": "d405", "name": "Campari Orange", "price": 6.80, "ingredients": "Campari, Orangensaft", "tags": ["alcoholic", "longdrink"] },
        { "id": "d406", "name": "Campari Soda", "price": 6.50, "ingredients": "Campari, Soda", "tags": ["alcoholic", "longdrink"] },
        { "id": "d407", "name": "Malibu Orange", "price": 6.80, "ingredients": "Malibu, Orangensaft", "tags": ["alcoholic", "longdrink"] },
        { "id": "d408", "name": "Wodka Orange", "price": 6.80, "ingredients": "Wodka, Orangensaft", "tags": ["alcoholic", "longdrink"] },
        { "id": "d409", "name": "Wodka Energy", "price": 6.80, "ingredients": "Wodka, Energy Drink", "tags": ["alcoholic", "longdrink"] },
        { "id": "d410", "name": "Wodka Lemon", "price": 6.80, "ingredients": "Wodka, Zitrone, Soda", "tags": ["alcoholic", "longdrink"] },
        { "id": "d411", "name": "Wodka Wildberry", "price": 6.80, "ingredients": "the ORGANICS by Red Bull purple Berry, Wodka", "tags": ["alcoholic", "longdrink"] },
        { "id": "d412", "name": "Wodka Makava", "price": 6.80, "ingredients": "Wodka, Makava", "tags": ["alcoholic", "longdrink"] },
        { "id": "d413", "name": "Gummibärli", "price": 6.80, "ingredients": "Fruchtiger Longdrink", "tags": ["alcoholic", "longdrink"] },
        { "id": "d414", "name": "Limoncello Soda", "price": 6.80, "ingredients": "Limoncello, Soda", "tags": ["alcoholic", "longdrink"] },
        { "id": "d415", "name": "Cointreau Tonic-Spritz", "price": 7.30, "ingredients": "Cointreau, Tonic Water", "tags": ["alcoholic", "longdrink"] },
        { "id": "d416", "name": "Limoncello Spritz", "price": 8.50, "ingredients": "the ORGANICS by Red Bull bitter Lemon, Limoncello, A-Nobis Street Art brut", "tags": ["alcoholic", "longdrink"] },
        { "id": "d417", "name": "Orange Spritz", "price": 8.50, "ingredients": "the ORGANICS by Red Bull black Orange, Aperol, A-Nobis Street Art brut", "tags": ["alcoholic", "longdrink"] },
        { "id": "d418", "name": "Pink Josie", "price": 8.50, "ingredients": "the ORGANICS by Red Bull easy Lemon, Passoa", "tags": ["alcoholic", "longdrink"] },
        { "id": "d419", "name": "Fizzy Peachy", "price": 8.50, "ingredients": "the ORGANICS by Red Bull fizzy Peach, A-Nobis Street Art brut", "tags": ["alcoholic", "longdrink"] },
        { "id": "d420", "name": "Dark and Windy", "price": 10.50, "ingredients": "the ORGANICS by Red Bull ginger Beer, brauner Rum, Limettensaft", "tags": ["alcoholic", "longdrink"] }
      ]
    },
    {
      "id": "beer",
      "name": "Bier",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🍺",
      "items": [
        { "id": "d500", "name": "Schlägl / Pilsner Urquell / Monatsbier vom Fass (0,2)", "price": 3.70, "volume": "0,2l", "tags": ["alcoholic", "beer", "draft"] },
        { "id": "d501", "name": "Schlägl / Pilsner Urquell / Monatsbier vom Fass (0,3)", "price": 4.20, "volume": "0,3l", "tags": ["alcoholic", "beer", "draft"] },
        { "id": "d502", "name": "Schlägl / Pilsner Urquell / Monatsbier vom Fass (0,5)", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "draft", "popular"] },
        { "id": "d503", "name": "Radler vom Fass (0,3)", "price": 4.20, "volume": "0,3l", "ingredients": "Bier & Zitronenlimonade", "tags": ["alcoholic", "beer", "draft"] },
        { "id": "d504", "name": "Radler vom Fass (0,5)", "price": 4.90, "volume": "0,5l", "ingredients": "Bier & Zitronenlimonade", "tags": ["alcoholic", "beer", "draft"] },
        { "id": "d505", "name": "Augustiner Weißbier", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d506", "name": "Grandauer Weißbier", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d507", "name": "Benediktiner Weissbier (dunkel)", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d508", "name": "die Weisse (dunkel)", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d509", "name": "Unertl Weisbier (dunkel)", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d510", "name": "Gerstensaft des Herrn Mayer Thomas", "price": 4.90, "volume": "0,5l", "description": "Kristallklar und goldgelb, malzaromatisch mit Hopfennase, frisch und harmonisch herb mit zarter Bittere", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d511", "name": "Golser Helles", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d512", "name": "Starkenberg Heimatbier", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d513", "name": "Spaten", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d514", "name": "Hirter Pils", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d515", "name": "Obertrumer Herbstbier (dunkel)", "price": 4.90, "volume": "0,5l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d516", "name": "Trumer Obertrumer Märzen", "price": 4.70, "volume": "0,33l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d517", "name": "Trumer Obertrumer Bio Zwickl", "price": 4.70, "volume": "0,33l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d518", "name": "Trumer Pils", "price": 4.90, "volume": "0,33l", "tags": ["alcoholic", "beer", "bottle"] },
        { "id": "d519", "name": "Benediktiner Alkoholfrei", "price": 4.50, "volume": "0,5l", "tags": ["non-alcoholic", "beer", "bottle"] },
        { "id": "d520", "name": "Spaten Alkoholfrei", "price": 4.50, "volume": "0,5l", "tags": ["non-alcoholic", "beer", "bottle"] },
        { "id": "d521", "name": "Schneider Alkoholfrei", "price": 4.50, "volume": "0,5l", "tags": ["non-alcoholic", "beer", "bottle"] }
      ]
    },
    {
      "id": "gin",
      "name": "Gin",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🌿",
      "items": [
        { "id": "d600", "name": "The Botanist", "price": 5.50, "volume": "4cl", "description": "22 botanische Zutaten aus Schottland", "ingredients": "Apfelminze, Birkenblätter, Holunderblüten, Heideblüten, Wacholder, Angelikawurzeln, Zitronenschalen, Orangenschalen, Koriander u.v.m.", "tags": ["alcoholic", "gin"] },
        { "id": "d601", "name": "Malfy Gin Arancia", "price": 5.50, "volume": "4cl", "ingredients": "Wacholder, sizilianische Blut-Orangenschalen, Koriander, Kassiarinde, Florentiner Schwertlilienwurzel, Süßholzwurzel, Zitronenschalen, Grapefruitschalen", "tags": ["alcoholic", "gin"] },
        { "id": "d602", "name": "Malfy Gin con Limone", "price": 5.50, "volume": "4cl", "ingredients": "Wacholder, Zitronen, Koriander, Kassiarinde, Florentiner Schwertlilienwurzel, Angelikawurzel, Orangenwurzel, Süßholzwurzel, Orangen- und Grapefruitschalen", "tags": ["alcoholic", "gin"] },
        { "id": "d603", "name": "Malfy Gin Rosa", "price": 5.50, "volume": "4cl", "ingredients": "Wacholder, Pink Grapefruit, Rhabarber, Koriander, Kassiarinde, Florentiner Schwertlilienwurzel, Süßholzwurzel, Zitronen, Orangenschalen", "tags": ["alcoholic", "gin"] },
        { "id": "d604", "name": "Roku Gin", "price": 5.50, "volume": "4cl", "description": "Japanischer Gin", "ingredients": "Sakurablüte und –blätter, Sencha und Gyokuro Tee, Sancho-Pfeffer, Yuzu-Schale, Wacholder, Koriander, Angelikawurzel", "tags": ["alcoholic", "gin"] },
        { "id": "d605", "name": "Gin Mare", "price": 7.50, "volume": "4cl", "description": "Mediterraner Gin", "ingredients": "Wacholder, Orangen- und Zitronenschale, Koriander, Kardamom, Arbequina-Oliven, Basilikum, Rosmarin, Thymian", "tags": ["alcoholic", "gin"] },
        { "id": "d606", "name": "Drumshanbo Gunpowder Irish Gin", "price": 8.00, "volume": "4cl", "ingredients": "Chinesische Limone, Gunpowder Tea, Kaffir Limette, Grapefruit, Wacholder, Angelika, Kardamom", "tags": ["alcoholic", "gin"] },
        { "id": "d607", "name": "Elephant Orange & Cocoa Gin", "price": 9.50, "volume": "4cl", "description": "Sonnengereifte zitrus-süße Orangen mit schokoladigen Noten sanft gerösteter Kakaobohnen", "ingredients": "Wacholder, Orangen, Kakao", "tags": ["alcoholic", "gin"] },
        { "id": "d608", "name": "Monkey 47", "price": 9.50, "volume": "4cl", "description": "47 Botanicals aus dem Schwarzwald", "ingredients": "Wacholder, Akazienblüten, Fichtensprossen, Paradieskörner, Koriander, Kardamom, Gewürznelken, Lavendel, Süßholz, Bitterorange, Preiselbeere", "tags": ["alcoholic", "gin", "popular"] },
        { "id": "d609", "name": "Maestoso Vienna Dry Gin", "price": 10.00, "volume": "4cl", "description": "Wiener Gin", "ingredients": "Tannenwipferl, Wacholder, Hagebutte, Kronprinz Rudolf Apfel", "tags": ["alcoholic", "gin"] },
        { "id": "d610", "name": "Paó de Sitges Gin", "price": 10.00, "volume": "4cl", "ingredients": "Rosmarin, Lavendel, Thymian, Orangen- und Zitronenschale, Honig, Wacholder, Koriander, Limettenblätter, Zitronenverbene, Pfefferkörner", "tags": ["alcoholic", "gin"] },
        { "id": "d611", "name": "Le Tribute", "price": 10.50, "volume": "4cl", "ingredients": "Zitrusfrüchte, Limette, Mandarine, Zitronengras, Kardamom", "tags": ["alcoholic", "gin"] },
        { "id": "d612", "name": "Portofino London Dry Gin", "price": 15.00, "volume": "4cl", "description": "Mediterrane Kräuter, mild mit deutlichen Wacholdernoten, Rosmarin, Lavendel und Salbei", "ingredients": "Wacholder, Zitrusfrüchte, Rosmarin, Lavendel, Salbei", "tags": ["alcoholic", "gin"] }
      ]
    },
    {
      "id": "rum",
      "name": "Rum",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🥃",
      "items": [
        { "id": "d700", "name": "Coruba Jamaica Overproof Rum", "price": 3.00, "volume": "2cl", "description": "74% vol. — Vanille, Kaffee, Kakao und Nuss, feuriges Bouquet", "tags": ["alcoholic", "rum"] },
        { "id": "d701", "name": "Barceló Imperial", "price": 4.50, "volume": "2cl", "description": "Bis zu zehn Jahre gereift, exquisite Harmonie zwischen Farbe, Aroma und Geschmack", "tags": ["alcoholic", "rum"] },
        { "id": "d702", "name": "Remedy Pineapple", "price": 4.50, "volume": "2cl", "description": "Ausgeprägte Aromen von Ananas und Mango, Karamell, Vanille, Eichenwürze", "tags": ["alcoholic", "rum"] },
        { "id": "d703", "name": "Flor de Caña 12 Year", "price": 5.00, "volume": "2cl", "description": "Nachhaltig produziert, kein Zucker — rote Früchte, Honig, geröstete Nüsse, Vanille und Bratapfel", "tags": ["alcoholic", "rum"] },
        { "id": "d704", "name": "Diplomatico Reserva Exclusiva 12 YO", "price": 5.00, "volume": "2cl", "description": "Zimt, Kakao, Rosineneis, Gewürznelken, tropische Früchte, Schokolade, Karamelltoffée", "tags": ["alcoholic", "rum"] },
        { "id": "d705", "name": "O.Rum Organic Premium Gold — Farthofer", "price": 5.00, "volume": "2cl", "description": "Österreichischer Bio-Rum — dunkle Früchte, Zartbitterschokolade, Karamell", "tags": ["alcoholic", "rum"] },
        { "id": "d706", "name": "Don Q Gran Anejo", "price": 5.50, "volume": "2cl", "description": "Gebackene Äpfel, Birnen, tropische Früchte, rauchige Töne, Eiche, Nüsse, Vanille", "tags": ["alcoholic", "rum"] },
        { "id": "d707", "name": "Don Papa Baroko", "price": 5.50, "volume": "2cl", "description": "Melasse, weiche Vanille, Obstkuchen, kandierte Zitrusfrüchte", "tags": ["alcoholic", "rum"] },
        { "id": "d708", "name": "Flor de Caña Centenario Gold 18 YO", "price": 6.00, "volume": "2cl", "description": "Mandeln, Schokolade, Nougat, Gewürze, cremige Zartbitterschokolade, Karamelltoffees", "tags": ["alcoholic", "rum"] },
        { "id": "d709", "name": "CAB-RON Caribbean & Barbados", "price": 7.50, "volume": "2cl", "description": "Vanille, Karamell, Muskatnuss — trocken, würzig, getrocknete Früchte, Tabak", "tags": ["alcoholic", "rum"] },
        { "id": "d710", "name": "Don Papa Sherry Cask", "price": 14.50, "volume": "2cl", "description": "Kandierte Südfrüchte, Zwetschken, Rosinen, Zartbitterschokolade, Pflaumen, Kakao, Datteln, Karamellcreme", "tags": ["alcoholic", "rum"] },
        { "id": "d711", "name": "Emperor Mauritian Rum DEEP BLUE Jubilee Cognac Finish", "price": 18.00, "volume": "2cl", "description": "Tropische Früchte, Vanille, Mangos, Pfirsiche", "tags": ["alcoholic", "rum"] }
      ]
    },
    {
      "id": "whiskey",
      "name": "Whiskey",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🥃",
      "items": [
        { "id": "d800", "name": "Jack Daniels", "price": 3.00, "volume": "2cl", "tags": ["alcoholic", "whiskey"] },
        { "id": "d801", "name": "The Glenlivet Founders Reserve", "price": 4.50, "volume": "2cl", "description": "Speyside — Nase: Vanille, fein nuanciert. Gaumen: Malz, Vanille, leichte Eiche. Finish: kurz, leicht nach Pflaumen", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d802", "name": "Glenmorangie Nectar D'Or", "price": 5.00, "volume": "2cl", "description": "Nase: Zitronentarte, cremige Vanille. Gaumen: Lebkuchen, Muskatnuss, Baiser. Finish: Zitrus, Ingwer", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d803", "name": "Talisker 10 YO", "price": 5.00, "volume": "2cl", "description": "Nase: stechend und rauchig, fruchtige Noten. Gaumen: Rauch, süßes Malz, Meersalz, Pfefferschärfe. Finish: gewaltig gepfeffert", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d804", "name": "Kilchoman Sanaig Islay", "price": 5.50, "volume": "2cl", "description": "Nase: Karamell, Vanille. Gaumen: eleganter Torfrauch, Zitrusnoten. Finish: Torfrauch, Früchte, Süße", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d805", "name": "Laphroaig PX Cask Islay", "price": 5.50, "volume": "2cl", "description": "Nase: Sherry, Sultaninen, Rosinen, Lakritze. Gaumen: Rauch, Eiche, Sherry. Finish: trocken und rauchig", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d806", "name": "The Dalmore 12 YO Single Malt", "price": 6.00, "volume": "2cl", "description": "Nase: Schokolade, Zitrus, Nüsse, Vanille-Toffées. Gaumen: Sherry, Zitrusfrüchte, Rosinen, cremige Vanille. Finish: Kaffee, Eichenholz, dunkle Schokolade", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d807", "name": "Redbreast 12 YO Irish Whiskey", "price": 6.50, "volume": "2cl", "description": "Dreifache Destillation im Pot Still — Nase: getrocknete Früchte, Bananen, Äpfel, Vanille. Gaumen: Sherry, Birne, Aprikose. Finish: bombastisch lang", "tags": ["alcoholic", "whiskey", "irish"] },
        { "id": "d808", "name": "Michter's US*1 Straight Bourbon", "price": 7.50, "volume": "2cl", "description": "Kentucky Bourbon — fein nuanciert, harmonisch balanciert, angenehm erdig", "tags": ["alcoholic", "whiskey", "bourbon"] },
        { "id": "d809", "name": "Caol Ila Distillers Edition 2022", "price": 8.00, "volume": "2cl", "description": "Nase: medizinisch, fruchtig, Torfrauch. Gaumen: malzig, süß, Zimt, Meerluft, erdige Torfnoten. Finish: langanhaltend, vielschichtig", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d810", "name": "Smokehead Sherry Blast Islay", "price": 8.50, "volume": "2cl", "description": "Nase: Torfnoten, cremige Anklänge, Eiche, Vanillepudding. Gaumen: schwarzer Rauch, gebrannte Nüsse, würzige Rosinen. Finish: Sherry-Noten, salzig", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d811", "name": "Laphroaig Lore", "price": 9.50, "volume": "2cl", "description": "Nase: rauchig, maritim, Holzkohleasche, Bitterschokolade, Vanille. Gaumen: knackiger Torf, roter Chilipfeffer, vollmundig. Finish: lang", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d812", "name": "Aberlour A'Bunadh Batch No. 77", "price": 10.50, "volume": "2cl", "description": "Nase: Schokopralinen, süßer Sherry, saftige Orangen. Gaumen: dunkle Kirschen, getrocknete Früchte, Ingwer, Sherry, Eichenholz. Finish: lang, ausbalanciert", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d813", "name": "Bunnahabhain 18 YO", "price": 15.00, "volume": "2cl", "description": "Nase: maritim, Karamell, Nüsse. Gaumen: würzig, süß, Vanille, Honig, reife Sherrytöne, Leder. Finish: sehr lang, Rauchschwaden", "tags": ["alcoholic", "whiskey", "scotch"] },
        { "id": "d814", "name": "Bruichladdich Octomore 14.1", "price": 20.00, "volume": "2cl", "description": "Intensivster Torf der Welt — Karamell, Rauch, Kokosnuss, Mandeln, Zitrusfrucht, Toffee. Finish: endlos spannend", "tags": ["alcoholic", "whiskey", "scotch", "islay"] },
        { "id": "d815", "name": "Bunnahabhain 25 YO", "price": 40.00, "volume": "2cl", "description": "Nase: Sherry, Toffée, würziges Leder, Eichenholz, Zimt. Gaumen: dunkle Beeren, geröstetes Malz, Nüsse, Rosinen. Finish: seidenweich", "tags": ["alcoholic", "whiskey", "scotch"] }
      ]
    },
    {
      "id": "tequila",
      "name": "Tequila",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🌵",
      "items": [
        { "id": "d850", "name": "Olmeca Altos Reposado", "price": 4.00, "volume": "2cl", "description": "Pot Still gebrannt, 6–8 Monate in Bourbonfässern gereift", "tags": ["alcoholic", "tequila"] },
        { "id": "d851", "name": "Padre Azul Blanco", "price": 7.00, "volume": "2cl", "description": "Samtig und intensiv, Aromen von gekochter Agave, Grapefruit, Zitrone, Minze, Kirsche, Pfirsich, Ananas", "tags": ["alcoholic", "tequila"] },
        { "id": "d852", "name": "Padre Azul Reposado", "price": 7.00, "volume": "2cl", "description": "Gekochte Agave, Birne, Banane, Vanille, Karamell, Kokos, weiße Schokolade", "tags": ["alcoholic", "tequila"] },
        { "id": "d853", "name": "Padre Azul Añejo", "price": 7.00, "volume": "2cl", "description": "Kaffee, gebranntes Karamell, Vanille, Trockenfrüchte, Zimt, Schokolade — besonders langer Abgang", "tags": ["alcoholic", "tequila"] },
        { "id": "d854", "name": "Don Julio Anejo", "price": 7.00, "volume": "2cl", "description": "18 Monate in Eichenfässern — Nase: Honig, Früchte. Gaumen: Limone, Grapefruit, Butterscotch. Finish: würzig", "tags": ["alcoholic", "tequila"] },
        { "id": "d855", "name": "La Cofradia Reposado 100% de Agave", "price": 9.50, "volume": "2cl", "description": "Fruchtig, cremig, trocken, weiche Würze — langer würziger Abgang", "tags": ["alcoholic", "tequila"] },
        { "id": "d856", "name": "José Cuervo Reserva de Familia Reposado", "price": 10.00, "volume": "2cl", "description": "Nase: Pfeffer, Agave. Gaumen: tropische Früchte, Nelke, Vanille. Finish: lang und mild", "tags": ["alcoholic", "tequila"] }
      ]
    },
    {
      "id": "shots",
      "name": "Shots",
      "type": "drinks",
      "alcoholic": true,
      "emoji": "🎯",
      "items": [
        { "id": "d900", "name": "Injection", "price": 4.50, "tags": ["alcoholic", "shot"] },
        { "id": "d901", "name": "Wodka Schnee", "price": 4.50, "tags": ["alcoholic", "shot"] },
        { "id": "d902", "name": "Caffo Vecchio Amaro del Capo 4cl", "price": 5.50, "description": "29 Kräuter, Früchte, Blumen und Wurzeln aus Kalabrien — meistverkaufter Bitters Italiens", "tags": ["alcoholic", "shot"] },
        { "id": "d903", "name": "Fernet Branca 4cl", "price": 6.50, "description": "Italiens beliebter Kräuterlikör — eisgekühlt als Shot: minzig, floral, würzig, leichte Süße", "tags": ["alcoholic", "shot"] },
        { "id": "d904", "name": "Frangelico", "price": 5.50, "tags": ["alcoholic", "shot"] },
        { "id": "d905", "name": "Olmeca Tequila Gold 4cl", "price": 5.50, "description": "Agave, Zitrus, Honig, fruchtig-süß, Pfeffernote, Vanille und Nuss", "tags": ["alcoholic", "shot"] },
        { "id": "d906", "name": "Shots 8cl (Apfelstrudel, Cranberry, Mango, Maracuja)", "price": 4.50, "tags": ["alcoholic", "shot"] },
        { "id": "d907", "name": "Aktion 10 Shots", "price": 25.00, "description": "Apfel, Apfelstrudel, Banane, Cranberry, Erdbeer, Mango, Maracuja", "tags": ["alcoholic", "shot", "deal"] },
        { "id": "d908", "name": "Aktion 20 Shots", "price": 50.00, "description": "Apfelstrudel, Cranberry, Erdbeer, Mango, Maracuja", "tags": ["alcoholic", "shot", "deal"] }
      ]
    },
    {
      "id": "juices",
      "name": "Säfte & Limonaden",
      "type": "drinks",
      "alcoholic": false,
      "emoji": "🍊",
      "items": [
        { "id": "d1000", "name": "Saft Pur (1/4)", "price": 3.70, "volume": "0,25l", "description": "Apfel, Orangen, Ananas, Maracuja, Mango, Cranberry", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1001", "name": "Saft Pur (1/2)", "price": 5.50, "volume": "0,5l", "description": "Apfel, Orangen, Ananas, Maracuja, Mango, Cranberry", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1002", "name": "Saft Gespritzt (1/4)", "price": 3.30, "volume": "0,25l", "description": "Apfel, Orangen, Ananas, Maracuja, Mango, Cranberry", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1003", "name": "Saft Gespritzt (1/2)", "price": 4.70, "volume": "0,5l", "description": "Apfel, Orangen, Ananas, Maracuja, Mango, Cranberry", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1004", "name": "Säfte mit Leitung (1/4)", "price": 2.40, "volume": "0,25l", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1005", "name": "Säfte mit Leitung (1/2)", "price": 3.70, "volume": "0,5l", "tags": ["non-alcoholic", "juice", "vegan"] },
        { "id": "d1006", "name": "Hausgemachte Limonade", "price": 5.80, "description": "Mizi (Holunder Minze), Bärli (Beerenmix), Rosal (Rose Limette)", "tags": ["non-alcoholic", "lemonade", "vegan", "popular"] },
        { "id": "d1007", "name": "Planwirtschaft à la Prof. Neubauer (0,25)", "price": 8.00, "volume": "0,25l", "description": "Soda gemischt mit Leitungswasser", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1008", "name": "Planwirtschaft à la Prof. Neubauer (0,5)", "price": 16.00, "volume": "0,5l", "description": "Soda gemischt mit Leitungswasser", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1009", "name": "Sodasäfte (1/4)", "price": 3.50, "volume": "0,25l", "description": "Andi Babler (Soda Zitrone frisch gepresst), Soda Himbeere/Holunder, andere Sodasäfte", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1010", "name": "Sodasäfte (1/2)", "price": 4.70, "volume": "0,5l", "description": "Bruno Kreisky (Soda Zitrone frisch gepresst), Soda Himbeere/Holunder, andere Sodasäfte", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1011", "name": "Makava", "price": 4.60, "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1012", "name": "Schmex Kräuterlimonade (1/4)", "price": 3.70, "volume": "0,25l", "tags": ["non-alcoholic", "lemonade", "vegan"] },
        { "id": "d1013", "name": "Römerquelle", "price": 3.10, "description": "Still oder prickelnd", "tags": ["non-alcoholic", "water", "vegan"] },
        { "id": "d1014", "name": "El Tony Mate", "price": 4.60, "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1015", "name": "fritz-kola", "price": 4.60, "description": "Normal, Bio Kola, No Sugar", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1016", "name": "fritz-limo", "price": 4.60, "description": "Orange, Zitrone, Honigmelone, Apfel-Kirsch-Holunder", "tags": ["non-alcoholic", "lemonade", "vegan"] },
        { "id": "d1017", "name": "fritz-spritz", "price": 4.60, "description": "Bio-Apfelschorle, Bio-Traubenschorle, Bio-Rhabarberschorle", "tags": ["non-alcoholic", "soda", "vegan"] },
        { "id": "d1018", "name": "fritz-anjola", "price": 4.60, "description": "Bio-Limonade Ananas & Limette", "tags": ["non-alcoholic", "lemonade", "vegan"] },
        { "id": "d1019", "name": "Red Bull", "price": 4.60, "description": "Classic, Sugarfree, Summer, Apricot, Green, White, Yellow, Blue, Sea Blue, Peach", "tags": ["non-alcoholic", "energy", "vegan"] },
        { "id": "d1020", "name": "Richard's Sun Iced Tea", "price": 4.60, "description": "Blueberry, Lemon, Peach, Pomegranate, Watermelon & Pineapple", "tags": ["non-alcoholic", "tea", "vegan"] },
        { "id": "d1021", "name": "The Organics by Red Bull", "price": 4.60, "description": "simply Cola, black Orange, easy Lemon, Tonic Water, bitter Lemon, purple Berry, ginger Ale, ginger Beer, fizzy Peach, minty Blackberry", "tags": ["non-alcoholic", "soda", "vegan"] }
      ]
    },
    {
      "id": "coffee-tea",
      "name": "Kaffee & Tee",
      "type": "drinks",
      "alcoholic": false,
      "emoji": "☕",
      "items": [
        { "id": "d1100", "name": "Espresso", "price": 2.60, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1101", "name": "Großer Espresso", "price": 3.60, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1102", "name": "Verlängerter", "price": 3.80, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1103", "name": "Melange", "price": 4.10, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1104", "name": "Cafe Latte", "price": 4.70, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1105", "name": "Cappuccino", "price": 4.10, "tags": ["non-alcoholic", "coffee", "vegetarian"] },
        { "id": "d1106", "name": "Tee", "price": 3.60, "description": "Schwarz, Leonore Gewessler (Grüner Tee), Pfefferminze, Hibiskusblüten, Kräuter, Früchte, Ingwer-Chai", "tags": ["non-alcoholic", "tea", "vegan"] },
        { "id": "d1107", "name": "Zotter Trinkschokolade", "price": 4.90, "description": "Milch Kakao, 1001 Nacht, Weiße mit Vanille, Zimt Banane, Karamell", "tags": ["non-alcoholic", "hot-drinks", "vegetarian"] }
      ]
    },
    {
      "id": "milkshakes",
      "name": "Milchshakes",
      "type": "drinks",
      "alcoholic": false,
      "emoji": "🥛",
      "items": [
        { "id": "d1200", "name": "Erdbeere", "price": 5.80, "ingredients": "Erdbeer Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1201", "name": "Vanille", "price": 5.80, "ingredients": "Vanille Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1202", "name": "Mango", "price": 5.80, "ingredients": "Mango Saft, Mango Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1203", "name": "Kokos", "price": 5.80, "ingredients": "Kokos Sirup, Milch, Kokosflocken, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1204", "name": "Banane", "price": 5.80, "ingredients": "Bananen Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1205", "name": "Kokos-Schoko", "price": 5.80, "ingredients": "Kokos Sirup, Schoko Sirup, Milch, Kokosflocken, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1206", "name": "Erdbeere-Banane", "price": 5.80, "ingredients": "Erdbeer Sirup, Bananen Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1207", "name": "Hugo's Schokobanane", "price": 5.80, "ingredients": "Schoko-Bananen Sirup, Milch, Obers", "tags": ["non-alcoholic", "milkshake", "vegetarian"] },
        { "id": "d1208", "name": "Andere Sorten (auf Anfrage)", "price": 5.80, "tags": ["non-alcoholic", "milkshake", "vegetarian"] }
      ]
    },
    {
      "id": "food",
      "name": "Essen",
      "type": "food",
      "alcoholic": false,
      "emoji": "🍕",
      "items": [
        { "id": "f001", "name": "Hauspizza", "price": 10.90, "description": "Pizzateig, Tomatensauce, Käse, Schinken, Salami, Pfefferoni mit Grillpaprika, Oregano", "allergens": "A, G", "tags": ["food", "pizza", "popular"] },
        { "id": "f002", "name": "Tonnopizza", "price": 10.90, "description": "Pizzateig, Tomatensauce, Käse, Thunfisch, roter Zwiebel, Oregano", "allergens": "A, D, G", "tags": ["food", "pizza"] },
        { "id": "f003", "name": "Margheritapizza", "price": 9.90, "description": "Pizzateig, Tomatensauce, Käse, Oregano", "allergens": "A, G", "tags": ["food", "pizza", "vegetarian"] },
        { "id": "f004", "name": "Tomaten-Baguette", "price": 7.90, "description": "Französisches Weißbrot, Tomatensauce, Mozzarella, Tomaten, Basilikum, Tomami", "allergens": "A, G", "tags": ["food", "baguette", "vegetarian"] },
        { "id": "f005", "name": "Schinko-Baguette", "price": 7.90, "description": "Französisches Weißbrot, Béchamel, Speck, Lauch, Raclette-Gouda Mischung", "allergens": "A, G", "tags": ["food", "baguette"] },
        { "id": "f006", "name": "Bauernbrot", "price": 7.90, "description": "Handgemachtes Schwarzbrot, Speckmischung (Speck, Zwiebel, Schnittlauch), Käse, Knoblauchbutter, Gewürze", "allergens": "A, G", "tags": ["food", "snack"] },
        { "id": "f007", "name": "Nachos mit Käse", "price": 7.90, "allergens": "G", "tags": ["food", "snack", "vegetarian"] },
        { "id": "f008", "name": "Bierbrezn mit Liptauer oder Butter", "price": 3.50, "allergens": "A, M", "tags": ["food", "snack", "vegetarian"] }
      ]
    }
  ]
};

const S = {
  menu: null,
  all: [],
  activeTab: 'drinks',
  drinksCat: 'all',
  foodCat: 'all',
  activeFilter: 'all',
  searchQuery: '',
};

// ══ BOOT ═══════════════════════════════════════════
function boot() {
  S.menu = MENU_DATA;
  S.menu.categories.forEach(cat => {
    cat.items.forEach(item => {
      S.all.push({ ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji });
    });
  });
  buildChips('drinks');
  buildChips('food');
  renderDrinks();
  renderFood();
  wire();
}

// ══ TAB SWITCHING ══════════════════════════════════
function switchTab(tab) {
  S.activeTab = tab;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('screen-' + tab).classList.add('active');
  if (tab === 'search') setTimeout(() => document.getElementById('search-input').focus(), 280);
}

// ══ CATEGORY CHIPS ═════════════════════════════════
function buildChips(type) {
  const el = document.getElementById(type + '-chips');
  const cats = S.menu.categories.filter(c => c.type === type);
  let html = '<button class="chip active" data-cat="all" data-type="' + type + '">Alle</button>';
  cats.forEach(c => {
    html += '<button class="chip" data-cat="' + c.id + '" data-type="' + type + '">' + c.emoji + ' ' + c.name + '</button>';
  });
  el.innerHTML = html;
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      if (type === 'drinks') S.drinksCat = btn.dataset.cat;
      else S.foodCat = btn.dataset.cat;
      el.querySelectorAll('.chip').forEach(b => b.classList.toggle('active', b.dataset.cat === btn.dataset.cat));
      if (type === 'drinks') renderDrinks();
      else renderFood();
    });
  });
}

// ══ RENDER ═════════════════════════════════════════
function renderDrinks() { renderType('drinks', 'drinks-content', S.drinksCat); }
function renderFood()   { renderType('food', 'food-content', S.foodCat); }

function renderType(type, elId, activeCat) {
  const el = document.getElementById(elId);
  let cats = S.menu.categories.filter(c => c.type === type);
  if (activeCat !== 'all') cats = cats.filter(c => c.id === activeCat);
  el.innerHTML = cats.map(cat => catSection(cat)).join('');
}

function catSection(cat) {
  const rows = cat.items.map(item => rowHTML({
    ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji
  })).join('');
  return '<div class="cat-section" id="cat-' + cat.id + '">' +
    '<div class="cat-header" onclick="toggleCat(\'' + cat.id + '\')">' +
      '<span class="cat-emoji">' + cat.emoji + '</span>' +
      '<span class="cat-title">' + cat.name + '</span>' +
      '<span class="cat-count">' + cat.items.length + '</span>' +
      '<span class="cat-chevron">›</span>' +
    '</div>' +
    '<div class="cat-rows">' + rows + '</div>' +
  '</div>';
}

function rowHTML(item) {
  const sub = item.ingredients || item.description || '';
  const dot = (item.tags && item.tags.includes('popular')) ? '<div class="popular-dot"></div>' : '';
  return '<div class="item-row" onclick="openSheet(\'' + item.id + '\')">' +
    dot +
    '<div class="item-row-body">' +
      '<div class="item-row-name">' + escHtml(item.name) + '</div>' +
      (sub ? '<div class="item-row-sub">' + escHtml(truncate(sub, 52)) + '</div>' : '') +
    '</div>' +
    '<div class="item-row-right">' +
      '<span class="item-price">' + fmtPrice(item.price) + '</span>' +
      '<span class="row-chevron">›</span>' +
    '</div>' +
  '</div>';
}

function toggleCat(id) {
  document.getElementById('cat-' + id).classList.toggle('collapsed');
}

// ══ ITEM SHEET ═════════════════════════════════════
function openSheet(itemId) {
  const item = S.all.find(i => i.id === itemId);
  if (!item) return;
  const tagMap = { alcoholic:'Alkoholisch', vegetarian:'Vegetarisch', vegan:'Vegan', popular:'⭐ Beliebt', signature:'✦ Signature' };
  const tagHtml = (item.tags || []).map(t => {
    const cls = ['alcoholic','vegetarian','vegan','popular','signature'].includes(t) ? 'tag-' + t : 'tag-default';
    return '<span class="sheet-tag ' + cls + '">' + (tagMap[t] || t) + '</span>';
  }).join('');
  let html = '<p class="sheet-cat">' + item.catEmoji + ' ' + item.catName + '</p>';
  html += '<p class="sheet-name">' + escHtml(item.name) + '</p>';
  html += '<p class="sheet-price">' + fmtPrice(item.price) + (item.volume ? ' <span class="sheet-volume">/ ' + item.volume + '</span>' : '') + '</p>';
  if (tagHtml) html += '<div class="sheet-tags">' + tagHtml + '</div>';
  if (item.description) html += '<div class="sheet-divider"></div><p class="sheet-label">Beschreibung</p><p class="sheet-value">' + escHtml(item.description) + '</p>';
  if (item.ingredients) html += '<div class="sheet-divider"></div><p class="sheet-label">Zutaten</p><p class="sheet-value">' + escHtml(item.ingredients) + '</p>';
  if (item.allergens)   html += '<div class="sheet-divider"></div><p class="sheet-label">Allergene</p><p class="sheet-value">' + escHtml(item.allergens) + '</p>';
  document.getElementById('sheet-body').innerHTML = html;
  document.getElementById('sheet-backdrop').hidden = false;
  document.getElementById('item-sheet').hidden = false;
}

function closeSheet() {
  document.getElementById('sheet-backdrop').hidden = true;
  document.getElementById('item-sheet').hidden = true;
}

// ══ LEGAL SHEET ════════════════════════════════════
const LEGAL = {
  impressum: {
    eyebrow: '§ 5 ECG · § 14 UGB · § 63 GewO',
    title: 'Impressum',
    html: '<div class="legal-group">' +
      lrow('Betreiber', 'Verein Savio') +
      lrow('Adresse', 'Hauptstraße 1, 7210 Mattersburg, Österreich') +
      lrow('Telefon', '<a href="tel:+436768373067">+43 676 837 306 74</a>') +
      lrow('E-Mail', '<a href="mailto:office@verein-savio.at">office@verein-savio.at</a>') +
      lrow('Website', '<a href="https://cafe-savio.at" target="_blank" rel="noopener">cafe-savio.at</a>') +
      lrow('Tätigkeit', 'Café- und Gastronomiebetrieb') +
      lrow('Rechtsvorschriften', 'Gewerbeordnung (GewO) · <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener">ris.bka.gv.at</a>') +
      lrow('Aufsichtsbehörde', 'Bezirkshauptmannschaft Mattersburg') +
    '</div>' +
    '<p class="legal-stamp">Stand: Juni 2026</p>'
  },
  datenschutz: {
    eyebrow: 'Art. 13 DSGVO (EU) 2016/679',
    title: 'Datenschutz',
    html: '<div class="legal-group">' +
      lblk('Verantwortlicher', 'Verein Savio, Hauptstraße 1, 7210 Mattersburg · office@verein-savio.at') +
      lblk('Erhobene Daten', 'Diese App ist rein informativ. Es werden <strong>keine personenbezogenen Daten</strong> erhoben, gespeichert oder verarbeitet. Keine Nutzerkonten, keine Formulare, keine Zahlung.') +
      lblk('Cookies & Tracking', '<strong>Keine Cookies</strong>, kein Tracking, keine Analyse-Tools, keine Social-Media-Plugins.') +
      lblk('Hosting', 'GitHub Pages (GitHub, Inc., San Francisco, USA). Technisch bedingt speichert GitHub Server-Logfiles (IP, Datum, Seite). Basis: Art. 6 Abs. 1 lit. f DSGVO. Mehr: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.') +
      lblk('Google Fonts', 'Schriftarten von Google Ireland Limited, Dublin. Ihre IP wird dabei übermittelt. Basis: Art. 6 Abs. 1 lit. f DSGVO. Mehr: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Datenschutz</a>.') +
      lblk('Ihre Rechte (Art. 15–22)', 'Auskunft · Berichtigung · Löschung · Einschränkung · Datenübertragbarkeit · Widerspruch. Da keine Daten verarbeitet werden, sind diese Rechte faktisch gegenstandslos — aber vollständig gewährt.') +
      lblk('Beschwerde', 'Österreichische Datenschutzbehörde (DSB), Barichgasse 40–42, 1030 Wien · <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a> · <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">dsb.gv.at</a>') +
    '</div>' +
    '<p class="legal-stamp">Stand: Juni 2026</p>'
  },
  odr: {
    eyebrow: 'EU-Verordnung Nr. 524/2013 · LMIV EU 1169/2011',
    title: 'Rechtliches',
    html: '<div class="legal-group">' +
      lblk('Online-Streitbeilegung', 'Die EU-Kommission stellt eine OS-Plattform bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Schlichtungsverfahren teilzunehmen.') +
      lblk('Allergene & Preise', 'Angaben zu Allergenen dienen der Orientierung gemäß EU-Lebensmittelinformationsverordnung (LMIV). Alle Preise unverbindlich — maßgeblich sind die im Café ausgehängten Preislisten. Bei Allergien bitte Personal fragen.') +
      lblk('Urheberrecht', 'Alle Inhalte (Texte, Design) sind urheberrechtlich geschützt gemäß § 1 UrhG. Nutzung ohne Genehmigung untersagt.') +
      lblk('Externe Links', 'Für Inhalte verlinkter Seiten übernehmen wir keine Haftung.') +
    '</div>' +
    '<p class="legal-stamp">Stand: Juni 2026</p>'
  }
};

function lrow(label, value) {
  return '<div class="legal-row"><span class="legal-label">' + label + '</span><span class="legal-value">' + value + '</span></div>';
}
function lblk(title, text) {
  return '<div class="legal-block"><p class="legal-block-title">' + title + '</p><p class="legal-block-text">' + text + '</p></div>';
}

function openLegal(key) {
  const data = LEGAL[key];
  if (!data) return;
  document.getElementById('legal-body').innerHTML =
    '<p class="legal-sheet-eyebrow">' + data.eyebrow + '</p>' +
    '<p class="legal-sheet-title">' + data.title + '</p>' +
    '<div class="sheet-divider"></div>' +
    data.html;
  document.getElementById('legal-backdrop').hidden = false;
  document.getElementById('legal-sheet').hidden = false;
}

function closeLegal() {
  document.getElementById('legal-backdrop').hidden = true;
  document.getElementById('legal-sheet').hidden = true;
}

// ══ SEARCH ═════════════════════════════════════════
let searchTimer;
function handleSearch(query) {
  S.searchQuery = query;
  document.getElementById('search-clear').hidden = !query;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderSearch, 120);
}

function renderSearch() {
  const el = document.getElementById('search-results');
  const q = S.searchQuery.trim().toLowerCase();
  const f = S.activeFilter;
  if (!q && f === 'all') {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p class="empty-title">Suchen…</p><p class="empty-sub">Name, Zutat oder Kategorie</p></div>';
    return;
  }
  let items = [...S.all];
  if (f === 'drinks') items = items.filter(i => i.catType === 'drinks');
  else if (f === 'food') items = items.filter(i => i.catType === 'food');
  else if (f !== 'all') items = items.filter(i => i.tags && i.tags.includes(f));
  if (q) items = items.filter(i =>
    i.name.toLowerCase().includes(q) ||
    (i.description && i.description.toLowerCase().includes(q)) ||
    (i.ingredients && i.ingredients.toLowerCase().includes(q)) ||
    i.catName.toLowerCase().includes(q)
  );
  if (!items.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">😕</div><p class="empty-title">Nichts gefunden</p><p class="empty-sub">Anderen Begriff versuchen</p></div>';
    return;
  }
  const grouped = new Map();
  S.menu.categories.forEach(cat => {
    const ci = items.filter(i => i.catId === cat.id);
    if (ci.length) grouped.set(cat, ci);
  });
  let html = '';
  grouped.forEach((ci, cat) => {
    html += '<p class="results-group-label">' + cat.emoji + ' ' + cat.name + '</p>';
    html += '<div class="results-group">' + ci.map(item => rowHTML(item)).join('') + '</div>';
  });
  el.innerHTML = html;
}

// ══ RANDOM TOAST ═══════════════════════════════════
function showRandom(type) {
  const pool = S.all.filter(i => i.catType === type);
  if (!pool.length) return;
  const item = pool[Math.floor(Math.random() * pool.length)];
  const el = document.getElementById('toast');
  el.innerHTML = '<strong>' + escHtml(item.name) + '</strong>' +
    fmtPrice(item.price) + ' · ' + item.catEmoji + ' ' + item.catName +
    '<br><button class="toast-open-btn" onclick="openSheet(\'' + item.id + '\');hideToast()">Details ansehen</button>';
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(hideToast, 5000);
}
function hideToast() { document.getElementById('toast').hidden = true; }

// ══ HELPERS ════════════════════════════════════════
function fmtPrice(p) { return '\u20AC\u202F' + p.toFixed(2).replace('.', ','); }
function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
function escHtml(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

window.openSheet  = openSheet;
window.openLegal  = openLegal;
window.toggleCat  = toggleCat;
window.hideToast  = hideToast;

// ══ WIRE ═══════════════════════════════════════════
function wire() {
  document.querySelectorAll('.tab').forEach(t =>
    t.addEventListener('click', () => switchTab(t.dataset.tab)));

  document.getElementById('btn-random-drink').addEventListener('click', () => showRandom('drinks'));
  document.getElementById('btn-random-food').addEventListener('click', () => showRandom('food'));

  document.getElementById('sheet-backdrop').addEventListener('click', closeSheet);
  document.getElementById('legal-backdrop').addEventListener('click', closeLegal);

  const inp = document.getElementById('search-input');
  inp.addEventListener('input', e => handleSearch(e.target.value));
  document.getElementById('search-clear').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); inp.focus();
  });
  document.getElementById('search-cancel').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); switchTab('drinks');
  });

  document.querySelectorAll('#filter-chips .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      S.activeFilter = btn.dataset.filter;
      document.querySelectorAll('#filter-chips .chip').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === S.activeFilter));
      renderSearch();
    });
  });

  // Swipe down to close sheets
  [['item-sheet', closeSheet], ['legal-sheet', closeLegal]].forEach(([id, fn]) => {
    const el = document.getElementById(id);
    let startY = 0;
    el.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientY - startY > 80) fn();
    }, { passive: true });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSheet(); closeLegal(); }
  });
}

document.addEventListener('DOMContentLoaded', boot);
