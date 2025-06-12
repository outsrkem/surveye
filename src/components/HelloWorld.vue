<script>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
export default {
  name: "HelloWorld",
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  data() {
    return {
      questions: [],
      editStatus: [], // 所有提的编辑状态，只有一个处于编辑状态(true)
      activate: "", // 当前编辑的题的索引
    };
  },
  methods: {
    addOption(questionIndex) {
      this.questions[questionIndex].options.push(`选项${this.questions[questionIndex].options.length + 1}`);
    },
    removeOption(questionIndex, optionIndex) {
      this.questions[questionIndex].options.splice(optionIndex, 1);
    },
    switchEdit() {
      if (this.activate <= this.questions.length) {
        this.editStatus[this.activate] = false;
      }
      this.activate = this.questions.length;
      this.editStatus.push(true);
    },
    addQuestion(type) {
      console.log(this.questions);
      let newQuestion = {
        required: true,
      };
      this.switchEdit();
      switch (type) {
        case "radio":
          newQuestion = {
            ...newQuestion,
            type: "radio",
            title: "单选题",
            options: ["选项1", "选项2"],
            question: "",
            advancedType: "normal",
          };
          break;
        case "checkbox":
          newQuestion = {
            ...newQuestion,
            type: "checkbox",
            title: "多选题",
            options: ["选项1", "选项2"],
            question: "",
            minSelect: 1,
            maxSelect: 0,
          };
          break;
        case "text":
          newQuestion = {
            ...newQuestion,
            type: "text",
            oftype: "", // 所填内容的类型，用户填写时数据校验
            title: "填空题",
            question: "",
            placeholder: "",
            inputType: "text",
          };
          break;
      }

      this.questions.push(newQuestion);
    },
    removeQuestion(index) {
      this.editStatus.splice(index, 1);
      this.questions.splice(index, 1);
    },
    // 题目编辑状态动态调整
    editQuestion(index) {
      this.editStatus[this.activate] = false;
      this.editStatus[index] = true;
      this.activate = index;
    },
  },
};
</script>

<template>
  <div class="container" style="border: 1px dashed #000">
    <div style="display: flex">
      <div style="width: 800px">
        <div v-if="questions.length === 0" style="display: flex; justify-content: center">
          <p>暂无题目，点击下方按钮添加题目</p>
        </div>
        <div style="border-collapse: collapse">
          <div v-for="(question, index) in questions" :key="question.id" style="border: 1px dashed #000">
            <div style="padding: 18px">
              <div>
                <div v-if="question.type === 'radio'">
                  <a-flex vertical="false">
                    <div v-if="editStatus[index]">
                      <div>
                        <el-text>题目：{{ index + 1 }}.（单选）{{ question.question }}</el-text>
                      </div>
                      <div>
                        <a-input type="text" v-model:value="question.question"></a-input>
                      </div>
                      <label class="my-text">选项</label>
                      <div v-for="(option, optIndex) in question.options" :key="optIndex" style="margin: 10px; display: flex; align-items: center">
                        <a-input type="text" v-model:value="question.options[optIndex]" />
                        <MinusCircleOutlined style="margin-left: 10px" v-if="question.options.length > 1" @click="removeOption(index, optIndex)" />
                      </div>
                      <a-button type="dashed" block @click="addOption(index)">
                        <PlusOutlined />
                        添加选项
                      </a-button>
                    </div>
                    <div v-else>
                      <!-- 非编辑状态展示题目 -->
                      <el-text>{{ index + 1 }}.（单选）{{ question.question }}</el-text>
                      <div v-for="(option, optIndex) in question.options" :key="optIndex">
                        <a-radio v-model="radio" disabled value="disabled">{{ option }}</a-radio>
                      </div>
                    </div>
                  </a-flex>
                </div>
                <!-- 多选 -->
                <div v-if="question.type === 'checkbox'">
                  <a-flex vertical="false">
                    <div v-if="editStatus[index]">
                      <div>
                        <el-text>题目：{{ index + 1 }}.多选{{ question.question }}</el-text>
                      </div>
                      <div>
                        <a-input type="text" v-model:value="question.question"></a-input>
                      </div>
                      <label class="my-text">选项</label>
                      <div v-for="(option, optIndex) in question.options" :key="optIndex" style="margin-bottom: 8px; display: flex; align-items: center">
                        <a-input type="text" v-model:value="question.options[optIndex]" />
                        <MinusCircleOutlined style="margin-left: 10px" v-if="question.options.length > 1" @click="removeOption(index, optIndex)" />
                      </div>
                      <a-button type="dashed" block @click="addOption(index)"> 添加选项 </a-button>
                    </div>
                    <div v-else>
                      <!-- 非编辑状态展示题目 -->
                      <el-text>{{ index + 1 }}.（多选）{{ question.question }}</el-text>
                      <div v-for="(option, optIndex) in question.options" :key="optIndex">
                        <a-checkbox v-model="checked1" disabled>{{ option }}</a-checkbox>
                      </div>
                    </div>
                  </a-flex>
                </div>
                <!-- 文本填空 -->
                <div v-if="question.type === 'text'">
                  <div v-if="editStatus[index]">
                    <div>
                      <el-form label-position="top" label-width="auto" :model="questions">
                        <el-form-item label="题目:(填空)">
                          <el-input v-model="questions[index].question"></el-input>
                        </el-form-item>
                        <el-form-item label="提示文字(选填)">
                          <el-input v-model="questions[index].placeholder"></el-input>
                        </el-form-item>
                      </el-form>
                      <div style="padding: 0px">
                        <el-space>
                          <el-text>属性：</el-text>
                          <el-select ref="select" v-model="question.oftype" placeholder="选择属性">
                            <el-option label="普通文本" value="ptwb"></el-option>
                            <el-option label="身份证号码" value="sfzhm"></el-option>
                            <el-option label="手机号码" value="sjhm"></el-option>
                            <el-option label="邮政编码" value="yzbm"></el-option>
                          </el-select>
                          <el-checkbox>不允许重复</el-checkbox>
                        </el-space>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <!-- 非编辑状态展示题目 -->
                    <div style="margin-bottom: 8px">
                      <el-text>{{ index + 1 }}.（填空）{{ question.question }}</el-text>
                    </div>
                    <div>
                      <a-input disabled :placeholder="question.placeholder"></a-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 10px; display: flex; justify-content: flex-end">
              <a-space wrap>
                {{ activate }}|
                {{ editStatus[index] }}
                <a-checkbox>必答</a-checkbox>
                <a-button @click="editStatus[index] = false" :disabled="!editStatus[index]">完成</a-button>
                <a-button @click="editQuestion(index)" :disabled="editStatus[index]">编辑</a-button>
                <a-button @click="removeQuestion(index)">删除</a-button>
              </a-space>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; margin: 10px">
          <a-space>
            {{ editStatus }}
            <a-button @click="addQuestion('radio')">单选题目</a-button>
            <a-button @click="addQuestion('checkbox')">多选题目</a-button>
            <a-button @click="addQuestion('text')">填空题目</a-button>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.custom-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.custom-input:focus {
  outline: none;
  border-color: #2563eb; /* 蓝色主色调 */
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2); /* 轻微的蓝色阴影 */
}

/* 为不同类型的输入框添加变体（可选） */
.option-input {
  margin-right: 8px;
}
.my-text {
  --el-text-font-size: var(--el-font-size-base);
  --el-text-color: var(--el-text-color-regular);
  align-self: center;
  color: var(--el-text-color);
  font-size: var(--el-text-font-size);
  margin: 0;
  overflow-wrap: break-word;
  padding: 0;
}
</style>
