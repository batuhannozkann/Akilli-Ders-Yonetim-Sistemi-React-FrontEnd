import React from "react";
import {Header,Image,Icon,Grid, Divider, Segment,Button} from "semantic-ui-react"
const HomePage = (props)=>{
    return (
        <><div style={{backgroundColor:'#EFEFEE'}}>
            <Header as='h2' icon textAlign='center' style={{ paddingTop:30,backgroundColor: '#A0DEF5',margin:0}}>
                <Image src="adys-high-resolution-color-logo.jpeg" style={{ width: '200px', height: 'auto', marginBottom: 60 }} circular></Image>
                <Header.Content className="header" style={{ color: "#1B1C1D", paddingBottom:50,opacity:0.8 }}>Akıllı Ders Yönetim Sistemi, akademisyenler ile öğrenciler arasında bir köprü görevi gören web tabanlı bir uygulamadır.</Header.Content>
            </Header>
            <Segment vertical ui placeholder style={{backgroundColor:"#EFEFEE",border:'none',opacity:0.8}}>
    <Grid columns={1} stackable textAlign='center' className="container text" style={{marginTop:10}}>
      <Grid.Row verticalAlign='middle'>
        <Grid.Column className="container">
          <Header icon>
            <Icon name='sign-in' />
            Öğrenci kendi derslerine ait ders notlarını indirebilir, verilen uygulamaları / ödevleri takip edebilir ve uygulama / ödev gönderebilir.
          </Header>
          <Button primary>Giriş Yap</Button>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column className="container" style={{marginTop:10}} >
          <Header icon>
            <Icon name='book' />
            Sadece öğrenci ile değil, dünya ile de paylaşılan ders notları, uygulamaları ve ödevleri içerir.
          </Header>
          <Button primary>Herkese Açık Dersler</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
             </div></>
        )
}
export default HomePage;