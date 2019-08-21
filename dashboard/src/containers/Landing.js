import React, { Component } from 'react';
import './Landing.css'
class Landing extends Component {
    constructor() {
        super()
        this.signIn = this.signIn.bind(this)
    }

    componentDidMount(){
            const doc = document
            const rootEl = doc.documentElement
            const body = doc.getElementById("sample")

            rootEl.classList.remove('no-js')
            rootEl.classList.add('js')

            window.addEventListener('load', function () {
              body.classList.add('is-loaded')
            })


    }
    signIn(e) {
        e.preventDefault()
        this.props.userSession.redirectToSignIn()
      }

    render() {
        return (
<div id="sample" className="is-boxed has-animations lights-off">
    <div class="body-wrap boxed-container">
        <header class="site-header">
            <div class="container">
                <div class="site-header-inner">
                    <div class="brand header-brand">
                        <h1 class="m-0">
                            <a href="#">
								<img style={{ width: 40}}class="header-logo-image asset-dark" src="https://tunzal.ml/favicon.ico" alt="Logo"/>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section class="hero">
                <div class="container">
                    <div class="hero-inner">
						<div class="hero-copy">
	                        <h1 class="hero-title mt-0">Tunzal</h1>
	                        <p class="hero-paragraph">Tunzal is a tunneling solution to expose local endpoint outside of the private network at minimum cost.</p>
	                        <div class="hero-cta">
								<a class="button button-primary" onClick={(e)=>{ this.signIn(e)}}>Sign in with Blockstack</a>
							</div>
						</div>
						<div class="hero-media">
							<div class="header-illustration">
								<img class="header-illustration-image asset-dark" src="/images/header-illustration-dark.svg" alt="Header illustration"/>
							</div>
							<div class="hero-media-illustration">
								<img class="hero-media-illustration-image asset-dark" src="/images/hero-media-illustration-dark.svg" alt="Hero media illustration"/>
							</div>
							<div class="hero-media-container">
								<img class="hero-media-image asset-dark" style={{width: 560}} src="/images/front.png" alt="Hero media"/>
							</div>
						</div>
                    </div>
                </div>
            </section>

            <section class="features section">
                <div class="container">
					<div class="features-inner section-inner has-bottom-divider">
						<div class="features-header text-center">
							<div class="container-sm">
								<h2 class="section-title mt-0">Tunzal Service</h2>
	                            <p class="section-paragraph"></p>
								<div class="features-image">
									<img class="features-illustration asset-dark" src="/images/features-illustration-dark.svg" alt="Feature illustration"/>
									<iframe width="560" height="315" src="https://www.youtube.com/embed/9Lxm5o8BsM8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style={{position: 'relative'}}></iframe>
								</div>
							</div>
                        </div>
                        <div class="features-wrap">
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img class="asset-dark" src="/images/feature-01-dark.svg" alt="Feature 01"/>
                                    </div>
									<div class="feature-content">
                                    	<h3 class="feature-title mt-0">Expose to internet</h3>
                                    	<p class="text-sm mb-0">Temporarily sharing a website that is only running on your development machine</p>
									</div>
								</div>
                            </div>
							<div class="feature is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img class="asset-light" src="/images/feature-02-light.svg" alt="Feature 02"/>
										<img class="asset-dark" src="/images/feature-02-dark.svg" alt="Feature 02"/>
                                    </div>
									<div class="feature-content">
                                    	<h3 class="feature-title mt-0">Censorship resistant</h3>
                                    	<p class="text-sm mb-0">Running networked services on machines that are firewalled off from the internet</p>
									</div>
								</div>
                            </div>
							<div class="feature is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img class="asset-light" src="/images/feature-03-light.svg" alt="Feature 03"/>
										<img class="asset-dark" src="/images/feature-03-dark.svg" alt="Feature 03"/>
                                    </div>
									<div class="feature-content">
                                    	<h3 class="feature-title mt-0">Refunds</h3>
                                    	<p class="text-sm mb-0">Users only pay for the usage duration of our service and can get rest refunded whenever they want.</p>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

			<section class="cta section">
                <div class="container-sm">
                    <div class="cta-inner section-inner">
                        <div class="cta-header text-center">
                            <h2 class="section-title mt-0">Get tunzal and showcase your projects now</h2>
                            <p class="section-paragraph">Tunzal provides you a public domain for exposed endpoint in minutes and charges minimal. Tunzal uses lightning network for payment, it enables us to provide refund to much valued users.</p>
							<div class="cta-cta">
								<a class="button button-primary" onClick={(e)=>{ this.signIn(e)}}>Sign in with blockstack</a>
							</div>
					    </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer has-top-divider">
            <div class="container">
                <div class="site-footer-inner">
                    <div class="brand footer-brand">
                    </div>
                    <ul class="footer-links list-reset">
                        <li>
                            <a href="mailto:harshjniitr@gmail.com" target="_blank">Contact</a>
                        </li>
                        <li>
                            <a href="https://devpost.com/software/tunzal" target="_blank">Devpost</a>
                        </li>
                        <li>
                            <a href="https://github.com/harsh-98/tunzal/blob/master/assets/architecture.md" target="_blank">FAQ's</a>
                        </li>
                        <li>
						<a href="https://github.com/harsh-98/tunzal" target="_blank">Github</a>
                        </li>
                    </ul>
                    <ul class="footer-social-links list-reset">
                    </ul>
                    <div class="footer-copyright">&copy; 2019 Tunzal, all rights reserved</div>
                </div>
            </div>
        </footer>
    </div>
</div>
        )
    }
}

export default Landing