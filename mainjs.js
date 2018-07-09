        let setSize = '12in. x 18in. ';
        let stakes = false;
        let premColor = false;
        let incrPrice = 0;
        let descr = [setSize,  'White stock',  'No frames', 'No mark up'];

        const stakesToggle = document.getElementById("stakesToggle");
        const colorToggle = document.getElementById("colorToggle");
        const changeSize = document.getElementById("size_select");
        const priceInc = document.getElementById("markup"); //<-- the field
        const increasePrice = document.getElementById("increasePrice"); //<-- the button
        
        
        function updateDescr(){
            let d="- ";

            for(let i=0; i< descr.length; i++){
                d += descr[i] + " - " ;
            }
            document.getElementById("descr").innerHTML = d;
        }
        function toggleStakes(){
            stakesToggle.innerHTML = stakes ? "No frames / press to include frames" : "Frames added / Press to remove";
            stakesToggle.classList.toggle("active");
            stakes = !stakes;
            descr[2] = stakes ? "With frames" : "No frames";
            PopPricelist();
            updateDescr();
        }        
        function togglepremColor(){
            colorToggle.innerHTML = premColor ? "White stock / Press for color other than white" : "Premeium color stock / Press to remove";
            colorToggle.classList.toggle("active");
            premColor = !premColor;
            descr[1] = premColor ? "Premium color stock" : "White stock";
            PopPricelist();
            updateDescr();
        }
        function selectSize(e){
            setSize =  e.target.value;
            PopPricelist(); 
            descr[0] = setSize;
            updateDescr();
        }
        function applyMarkup(){
                incrPrice = priceInc.value;
                if(incrPrice != 0){
                    increasePrice.classList.add("active");
                    descr[3] = incrPrice + "% mark up"
                }else{
                    increasePrice.classList.remove("active");
                    descr[3] = "No mark up"
                }
            PopPricelist(); 
            updateDescr();
        }

        // DOES ALL PRICE ANALYSIS
        function PriceAnalysis( initialPrice, position ){  
            let price = initialPrice;
            if( stakes ){ price = price + .69; }
            if( premColor ){  price = price + 1; } 
            if(incrPrice != 0 ){ price = ( price * (incrPrice / 100) ) + price };
            
            let fullPrice = price * pricing[0][1][position];

            return parseFloat(price).toFixed(2) + '<span><br />' + parseFloat(fullPrice).toFixed(2) + '</span>';
        }

        //Populates list of available sizes
        const SizeList = function(){
            let t = '';
            for(let i=1; i< pricing.length; i++){
                t +=  '<option value="' + pricing[i][0] + '">' + pricing[i][0] + '</option>';
            }
            return t;
        } 
    
        //Populates pricelist
        const PopPricelist = function(){ 
            let priceTable = '<table>';
            let tableHeader = '';
                
            for(let i=0; i<pricing.length; i++){
                // Create header - pricebreak row
                if( i === 0){
                   for( let a=0; a< pricing[i][1].length; a++ ){ tableHeader += '<th>' + pricing[i][1][a] + '</th>'; }
                    priceTable += '<tr><th class="rowLead">' + setSize + ' Single Sided</th>' + tableHeader + '</tr>';
                }
                console.log(setSize);  
                // Creates rest of table data
                let colCount = 1;
                let rowCount = 1;
                if( pricing[i][0] === setSize ){ 
                    for(let z=1; z<pricing[i].length; z++){
                        priceTable += '<tr>';
                        priceTable += '<td class="rowLead"> ' + colCount + '-color </td>';
                            for(let x=0; x< pricing[i][z].length; x++){
                                priceTable += '<td>' + PriceAnalysis( pricing[i][z][x], x) + '</td>'; //<---------------- Price analysis
                            }
                        priceTable += '</tr>';
                        colCount++;
                        rowCount++;
                        if(colCount === 5){colCount = 1; }
                        if(rowCount === 5) { priceTable += '</table><table><tr><th class="rowLead"> ' + setSize + ' Double Sided</th> ' + tableHeader + '</tr>'; }
                    }
                }

            

            }
            priceTable += '</table>';
            document.getElementById("pricing_table").innerHTML = priceTable;
        }


        PopPricelist();
        updateDescr()
        document.getElementById('size_select').innerHTML = SizeList();    
        
        stakesToggle.addEventListener("click", function(){ toggleStakes()});
        colorToggle.addEventListener("click", function(){ togglepremColor()});
        changeSize.addEventListener("change", function(e){ selectSize(e)});
        increasePrice.addEventListener("click", function(){ applyMarkup()});