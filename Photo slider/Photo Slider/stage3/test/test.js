import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        //Test 17 - check Background cover
        this.page.execute(() => {
            let backgroundSize = window.getComputedStyle(this.summary).backgroundSize;
            return  backgroundSize === cover ?
                correct() :
                wrong(`Please, cover the entire background with picture.`)
            }
        )
        ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);