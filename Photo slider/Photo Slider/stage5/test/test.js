const path = require('path');
const pagePath = path.join(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function nonStrictCompare(a, b, offset) {
    if (!offset) {
        offset = 10;
    }
    return Math.abs(a - b) < offset;
}

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - Check container '.slider-wrapper'
        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider-wrapper');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider-wrapper element.`)
        }),

        // Test 2 - Check container '.slider'

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.slider');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slider element.`)
        }),

        // Test 3 - Check h1 element
        this.page.execute(() => {
            this.heading = document.getElementsByTagName('h1');

            return this.heading.length > 0 ?
                correct() :
                wrong(`Your page must contain main title`)
        }),

        // Test 4 - Check the title
        this.page.execute(() => {
            this.documentTitle = document.getElementsByTagName('title');
            return this.documentTitle ?
                correct() :
                wrong(`Your page must contain the title of the project`)
        }),

        // Test 5 - Check width and height of container 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                let neededSliderHeight = Math.round(window.innerHeight / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);
                neededSliderHeight = neededSliderHeight < 240 ? 240 : (neededSliderHeight > 600 ? 600 : neededSliderHeight);

                return {
                    'width': slider.getBoundingClientRect().width,
                    'height': slider.getBoundingClientRect().height,
                    'neededWidth': neededSliderWidth,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 && Math.abs(slider.height - (slider.neededHeight+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width} and height=${slider.height},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30} and height=${slider.neededHeight+30}`);
        }),

        // Test 6 - Check box-shadow of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.boxShadow === "rgba(0, 0, 0, 0.2) 0px 2px 15px 0px, rgba(0, 0, 0, 0.25) 0px 2px 20px 0px" ?
                correct() :
                wrong(`Set box shadow to the slider container.`)
        }),

        // Test 7 - Check border of a slider

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.border === "15px solid rgba(255, 255, 255, 0.235)" ?
                correct() :
                wrong(`Set border to the slider as shown on the image.`)
        }),

        // Test 8 - Check max-width 'slider'
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slider.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });

            return  Math.abs(slider.width - (slider.neededWidth+30)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slider (now you have width=${slider.width},
         but according to the dimensions of the window, its dimensions should be: width=${slider.neededWidth+30}`);
        }),

        // Test 9 - Check container '.slide-1'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-1');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-1 element.`)
        }),

        // Test 10 - Check container '.slide-2'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-2');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-2 element.`)
        }),

        // Test 11 - Check container '.slide-3'

        this.node.execute(async() => {
            const wrapper = await this.page.findById('slide-3');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a slide-3 element.`)
        }),

        // Test 12 - Check slider position
        this.node.execute(async () => {
            let slider = await this.page.evaluate(async () => {
                let slider = document.getElementsByClassName('slider')[0];
                let bodyWidth = Math.round(window.innerWidth);
                return {
                    'width': slider.getBoundingClientRect().width,
                    'xCoor': slider.getBoundingClientRect().x,
                    'neededBodyWidth': bodyWidth

                }
            });
            return Math.abs((slider.neededBodyWidth - slider.width)  / 2) == slider.xCoor ?
                correct() :
                wrong(`Check position of the slider container`);
        }),

        // Test 13 - Check container 'slide' width
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let neededSliderWidth = Math.round(window.innerWidth / 100 * 75);
                neededSliderWidth = neededSliderWidth < 320 ? 320 : (neededSliderWidth > 800 ? 800 : neededSliderWidth);

                return {
                    'width': slide.getBoundingClientRect().width,
                    'neededWidth': neededSliderWidth
                }
            });
            return  Math.abs(slide.width - (slide.neededWidth)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slide (now you have width=${slide.width},
         but according to the dimensions of the window, its dimensions should be: width=${slide.neededWidth}`);
        }),

        // Test 14 - Check container 'slide' height
        this.node.execute(async () => {
            let slide = await this.page.evaluate(async () => {
                let slide = document.getElementsByClassName('slide')[0];
                let slider = document.querySelector(".slider");
                let neededSliderHeight = slider.offsetHeight - slider.clientTop * 2;

                return {
                    'height': slide.getBoundingClientRect().height,
                    'neededHeight': neededSliderHeight
                }
            });

            return  Math.abs(slide.height - (slide.neededHeight)) < 2 ?
                correct() :
                wrong(`Check dimensions of .slide (now you have height=${slide.height},
         but according to the dimensions of the window, its dimensions should be: height=${slide.neededHeight}`);
        }),


        // Test 15 - Check overflow x of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowX === "auto" ?
                correct() :
                wrong(`Check overflow x property of slider. Your answer is: ${styles.overflowX}`)
        }),

        // Test 16 - Check overflow y of slider
        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.overflowY === "hidden" ?
                correct() :
                wrong(`Check overflow y of slider. You answer is ${styles.overflowY}.`)
        }),

        // Test 17 - Check background repeat

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundRepeat === "no-repeat" ?
                correct() :
                wrong(`The background pictures are repeated.`)
        }),

        // Test 18 - Check background size

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundSize === "cover" ?
                correct() :
                wrong(`The background image must cover the entire slide container.`)
        }),

        // Test 19 - Check background position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundPosition === "50% 50%" ?
                correct() :
                wrong(`The background image should be placed in the center. The current background position is set to ${styles.backgroundPosition}`)
        }),

        // Test 20   - Check scroll behavior

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slider')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollBehavior === "smooth" ?
                correct() :
                wrong(`The scroll of the slider should be smooth.`)
        }),

        // Test 21 - Check scroll snap align

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.slide')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.scrollSnapAlign === "start" ?
                correct() :
                wrong(`Set scroll from the start`)
        }),

        // Test 22 - Check dots container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.dots');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a dots container.`)
        }),

        // Test 23 - Check caption container

        this.node.execute(async() => {
            const wrapper = await this.page.findBySelector('.caption');
            return wrapper ?
                correct() :
                wrong(`Your page must contain a caption container.`)
        }),

        // Test 24 - Check dots position

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.position === "absolute" ?
                correct() :
                wrong(`Wrong position of dots container. Check the position of the dots.`)
        }),


        // Test 25 - Check dots position

        this.node.execute(async () => {
            let dotsCoords = await this.page.evaluate(async () => {
                let dotsObj = document.getElementsByClassName('dots')[0].getBoundingClientRect();
                let sliderObj = document.getElementsByClassName('slider')[0].getBoundingClientRect();
                return [dotsObj.x, dotsObj.width, sliderObj.width, sliderObj.x];
            });

            return nonStrictCompare((dotsCoords[2] - dotsCoords[1]) / 2, dotsCoords[0] - dotsCoords[3], 5) ?
                correct() :
                wrong(`Check position of dots element. Now left-position of this container: ${dotsCoords[0]}, but expected: ${(dotsCoords[2] - dotsCoords[1]) / 2 + dotsCoords[3]}.`);
        }),

        // Test 26 - Check dots transform

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.transform === "matrix(1, 0, 0, 1, -27, 0)" ?
                correct() :
                wrong(`Move the dots element exactly at the center of the main container.`)
        }),

        // Test 27 - Check dots gap

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.gap === "15px" ?
                correct() :
                wrong(`The gap between the dots should be set to 15px.`)
        }),

        // Test 28 - Check dots z-index

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.zIndex === "1" ?
                correct() :
                wrong(`Set the z-index of the dots container to 1.`)
        }),

        // Test 29 - Checks dots display

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "flex" ?
                correct() :
                wrong(`Dots container should be flexible. Check display property of the dots.`)
        }),

        // Test 30 - Checks item alignment

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.alignItems === "center" ?
                correct() :
                wrong(`Wrong item alignment`)
        }),

        // Test 31 - Checks justify content

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.dots')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.justifyContent === "center" ?
                correct() :
                wrong(`Wrong content alignment`)
        }),

        // Test 32 - Checks 3 a elements

        this.page.execute(() => {
            this.articleObj = document.getElementsByTagName('a');

            return this.articleObj.length === 3 ?
                correct() :
                wrong(`Your page should contain 3 a elements inside .dots container.`)
        }),

        // Test 33 - Checks width and height of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.width === "8px" && styles.height === "8px" ?
                correct() :
                wrong(`Check width and height of the a element`)
        }),

        // Test 34 - Checks border radius of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.borderRadius === "50%" ?
                correct() :
                wrong(`Your dots should be round. Check the border radius.`)
        }),

        // Test 35 - Checks background color of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.backgroundColor === "rgb(255, 255, 255)" ?
                correct() :
                wrong(`Your dots should be white. Check background color of the dots.`)
        }),


        // Test 36 - Checks opacity of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return Math.abs(styles.opacity - 0.75) < 0.2 ?
                correct() :
                wrong(`Your dots should be transparent. Check the transparency of the dots. Your answer is ${styles.opacity}`)
        }),


        // Test 37 - Checks transition of a elements

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.transition === "opacity 0.25s ease 0s" ?
                correct() :
                wrong(`Smoothly change the opacity state of dots`)
        }),


        // Test 38 - Checks cursor pointer

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('a')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.cursor === "pointer" ?
                correct() :
                wrong(`Show when the mouse pointer is over the dots`)
        }),

        // Test 39 - Checks dots hovering

        this.node.execute(async () => {
            const a = await this.page.findBySelector('a');
            await a.hover();
            const hoverA = await this.page.findBySelector('a:hover');
            sleep(900);
            const styles = await hoverA.getComputedStyles();

            return Math.abs(styles.opacity - 1) < 0.25 ?
                correct() :
                wrong(`Please check if the are dots hovering. ${styles.opacity}`)
        }),


        // Test 40 - Checks caption display block

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.display === "block" ?
                correct() :
                wrong(`Displays element as a block element`)
        }),

        // Test 41 - Checks position of caption container

        this.node.execute(async () => {
            let captionCoords = await this.page.evaluate(async () => {
                let articleObj = document.getElementsByClassName('caption')[0];
                return [articleObj.getBoundingClientRect().x, articleObj.getBoundingClientRect().y];
            });
            return nonStrictCompare(captionCoords[0], 848, 5) ?
                correct() :
                wrong(`Check the position of caption element.`);
        }),

        // Test 42 - Checks letter spacing of caption

        this.page.execute(async() => {
            this.articleObj = await document.querySelectorAll('.caption')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.letterSpacing === "0.5px" ?
                correct() :
                wrong(`Space the letters by 0.5px.`)
        }),

        // Test 43 - Checks font-size of h1 element

        this.page.execute(async() => {
           let font = window.getComputedStyle(document.querySelector("h1")).getPropertyValue('font-size');
           let fontSize = parseFloat(font);
            let fontH1 = Math.abs(fontSize - 38.6667) < 10;
            return fontH1 ?
                correct() :
                wrong(`The font size is incorrect. Check the font size of the main heading.`)
        }),

        // Test 44 - Checks color of h1 element

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('h1')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.color === "rgb(62, 62, 62)" ?
                correct() :
                wrong(`The font color of the main heading is incorrect. Check color of the main heading.`)
        }),

        // Test 45 - Checks font-family of h1 element

        this.page.execute(async() => {
            this.articleObj = await document.getElementsByTagName('h1')
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.fontFamily !== `Cardo, serif` ?
                wrong(`The font-family is incorrect. Check the font-family of the h1 element.`) : correct()
        }),

    ]}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000)
