import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [

        ]
    }

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);