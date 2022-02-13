import { NextPage } from 'next';

import Footer from '../components/footer';
import Header from '../components/header';
import HomePage from '../components/home';

const Home: NextPage = () => {
  return (
    <div className="bg-myblue bg-gradient-to-t from-myblue to-second h-screen">
      <Header title="ROaufgaben"></Header>
      <HomePage primaryText='ROaufgaben' secondaryText='Verwalte deine Hausaufgaben mit deiner Klasse an einem Ort.'></HomePage>
      <Footer></Footer>
    </div>
  )
}

export default Home;