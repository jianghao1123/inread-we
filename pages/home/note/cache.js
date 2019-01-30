const NOTE_CACHE_KEY = "NOTE_CACHE";
const NOTE_CACHE_LENGTH = 20;
const NOTE_EXPIRE_TIME = 1000 * 60 * 60 * 12;

/**
 * 缓存最近的20条数据
 */
export default class NoteCache{

    get(){
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: NOTE_CACHE_KEY,
                success: resolve,
                fail: reject
            });
        }).then(res=>{
            if(res.data && res.data.expireTime && res.data.notes){
                if(res.data.expireTime < new Date().getTime()){
                    wx.removeStorage({
                        key: NOTE_CACHE_KEY
                    });
                    return [];
                }
                return res.data.notes;
            }else{
                wx.removeStorage({
                    key: NOTE_CACHE_KEY
                });
                return [];
            }
        });
    }

    cover(notes){
        if(!notes || notes.length <= 0){
            return;
        }
        if(notes.length > NOTE_CACHE_LENGTH){
            notes = notes.slice(0, 20)
        }
        let data = {
            notes: notes,
            expireTime : NOTE_EXPIRE_TIME + new Date().getTime()
        }
        wx.setStorage({
            key: NOTE_CACHE_KEY,
            data: data
        });
    }
}